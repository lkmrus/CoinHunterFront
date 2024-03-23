export class ArbitrageData {
  constructor (arbitrageRecord) {
    this.pair = arbitrageRecord.pair
    this.exchange = arbitrageRecord.exchange
    this.buy = arbitrageRecord.buy
    this.spread = arbitrageRecord.spread
    this.bid = arbitrageRecord.bid
    this.ask = arbitrageRecord.ask
    this.bidSize = arbitrageRecord.bidSize
    this.askSize = arbitrageRecord.askSize
    this.volume = arbitrageRecord.volume
  }
}
