import { TimeFormatter } from '~/formatters/TimeFormatter.js'

export class SpreadData {
  constructor (spreadRecord) {
    this.id = spreadRecord.id

    this.pair = spreadRecord.pair
    this.profit = spreadRecord.spread
    this.askExchange = spreadRecord['ask-exchange']
    this.askPrice = spreadRecord['ask-price']
    this.askSize = spreadRecord['ask-size']
    this.bidExchange = spreadRecord['bid-exchange']
    this.bidPrice = spreadRecord['bid-price']
    this.lifeTime = this.getLifeTime(spreadRecord.finishedAt, spreadRecord.createdAt)
    this.createdDate = TimeFormatter.formatTime('yy.mm.dd hh:ii (GMT)', spreadRecord.createdAt)
  }

  getLifeTime (finishedAt = null, createdAt) {
    const timestampFinishedAt = new Date(finishedAt).getTime()
    const timestampCreatedAt = new Date(createdAt).getTime()

    const dateDifference = Math.floor((timestampFinishedAt - timestampCreatedAt) / 1000)
    const resultTimestamp = Math.max(0, dateDifference) <= 2 ? '< 2' : dateDifference

    return resultTimestamp
  }
}
