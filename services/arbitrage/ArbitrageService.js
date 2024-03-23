import { ArbitrageData } from '~/DTO/ArbitrageData.js'

export class ArbitrageService {
  arbitrageList = []

  constructor () {
    this.socket = new WebSocket('ws://78.140.137.106:8080')

    this.addWebsocketListener()
    this.listenWebsocket()
  }

  addWebsocketListener () {
    this.socket.addEventListener('open', () => {
      const filter = {
        authorization: 'Bearer DEV_TOKEN',
        // Фильтрация по парам на которые пользователь подписался
        // subscriptions: ['BTC-USDT', 'ETH-USDT'],
        // Фильтрация по биржам
        // exchanges: ['binance', 'bybit'], // binance, okx, bybit, bitget
        sorting: {
          field: 'spread', // spread, pair
          order: 'asc' // desc, asc
        },
        timeInterval: 1000,
        // Для пагинации
        limit: 1000,
        skip: 0
      }

      console.log(filter)

      this.sendWebsocket(filter)
    })
  }

  sendWebsocket (filter) {
    this.socket.send(JSON.stringify(filter))
  }

  listenWebsocket () {
    this.socket.addEventListener('message', event => this.updateArbitrageList.bind(this)(JSON.parse(event.data)))
  }

  updateArbitrageList (response) {
    this.arbitrageList = response.map(arbitrageRecord => new ArbitrageData(arbitrageRecord))

    console.log(this.arbitrageList)
  }
}
