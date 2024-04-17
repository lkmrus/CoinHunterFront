import { TimeFormatter } from '~/formatters/TimeFormatter.js'

export class ArbitrageData {
  constructor (arbitrageRecord, pair, spread) {
    this.pair = pair
    this.exchanges = arbitrageRecord.exchange
    this.buy = arbitrageRecord.buy
    this.spread = spread
    this.bid = arbitrageRecord.bid ?? 0
    this.ask = arbitrageRecord.ask ?? 0
    this.bidSize = arbitrageRecord.bidSize ?? 0
    this.askSize = arbitrageRecord.askSize ?? 0
    this.volume = arbitrageRecord.volume
    this.date = TimeFormatter.formatTime('hh:ii dd/mm/yyyy (gmt)', arbitrageRecord.date)
  }
}
