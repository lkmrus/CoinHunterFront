import { ArbitrageData } from '~/DTO/ArbitrageData.js'
import { CookieTrait } from '~/traits/CookieTrait.js'

export class ArbitrageService {
  arbitrageList = ref([])

  constructor () {
    this.socket = new WebSocket('ws://coin-hunter.trade:8080', undefined, {
      headers: {
        Authorization: `Bearer ${CookieTrait.getCookie('coinht')}`
      }
    })

    this.addWebsocketListener()
    this.listenWebsocket()
  }

  addWebsocketListener () {
    this.socket.addEventListener('open', () => {
      const filter = {
        authorization: 'Bearer DEV_TOKEN',
        // Фильтрация по парам на которые пользователь подписался
        subscriptions: ['ETH-USDT'],
        // Фильтрация по биржам
        // exchanges: ['binance', 'bybit'], // binance, okx, bybit, bitget
        sorting: {
          field: 'spread', // spread, pair
          order: 'asc' // desc, asc
        },
        timeInterval: 1000,
        // Для пагинации
        limit: 2,
        skip: 0
      }

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
    this.arbitrageList.value.length = 0

    console.log(response)

    response.map((arbitrageRecord) => {
      const transformedData = []

      arbitrageRecord.events.forEach((event) => {
        transformedData.push(new ArbitrageData(event, arbitrageRecord.pair, arbitrageRecord.spread))
      })

      this.arbitrageList.value = [
        ...this.arbitrageList.value,
        ...transformedData
      ]
    })
  }
}
