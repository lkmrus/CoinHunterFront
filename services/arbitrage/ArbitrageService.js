import { ArbitrageData } from '~/DTO/ArbitrageData.js'
import { CookieTrait } from '~/traits/CookieTrait.js'

export class ArbitrageService {
  arbitrageList = ref([])

  constructor () {
    const authToken = `Bearer ${CookieTrait.getCookie('coinht')}`
    this.socket = new WebSocket('wss://coin-hunter.trade:8080', undefined, {
      headers: {
        Authorization: authToken
      }
    })

    // Временно подключаемся при входе на страницу
    this.addWebsocketListener(authToken)
    this.listenWebsocket()
  }

  addWebsocketListener (authToken, filter = {}) {
    this.socket.addEventListener('open', () => {
      const filterData = {
        authorization: authToken,
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
        skip: 0,
        ...filter
      }

      this.sendWebsocket(filterData)
    })
  }

  unsubscribeFromListening () {
    this.socket.close()
  }

  sendWebsocket (filter) {
    this.socket.send(JSON.stringify(filter))
  }

  listenWebsocket () {
    this.socket.addEventListener('message', event => this.updateArbitrageList.bind(this)(JSON.parse(event.data)))
  }

  updateArbitrageList (response) {
    this.arbitrageList.value.length = 0

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
