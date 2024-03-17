export class SpreadData {
  constructor (arbitrageRecord) {
    this.id = arbitrageRecord.id

    this.pair = arbitrageRecord.pair
    this.profit = arbitrageRecord.spread
    this.askExchange = arbitrageRecord['ask-exchange']
    this.askPrice = arbitrageRecord['ask-price']
    this.askSize = arbitrageRecord['ask-size']
    this.bidExchange = arbitrageRecord['bid-exchange']
    this.bidPrice = arbitrageRecord['bid-price']
    this.lifeTime = this.getLifeTime(arbitrageRecord.finishedAt, arbitrageRecord.createdAt)
    this.createdDate = String(new Date(arbitrageRecord.createdAt)).split('(')[0]
  }

  getLifeTime (finishedAt = null, createdAt) {
    const timestampFinishedAt = new Date(finishedAt).getTime()
    const timestampCreatedAt = new Date(createdAt).getTime()

    const dateDifference = Math.floor((timestampFinishedAt - timestampCreatedAt) / 60000)
    const resultTimestamp = Math.max(0, dateDifference) <= 2 ? '< 2' : dateDifference

    return resultTimestamp
  }
}
