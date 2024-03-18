import { FilterConfig } from '~/configs/FilterConfig.js'

const SPLITTED_PAIR_FIRST_INDEX = 0
const SPLITTED_PAIR_SECOND_INDEX = 1

export class FilterService {
  splittedPair = []
  askExchange = ''

  spreadsCount = 0

  constructor (FilterModel) {
    this.filter = new FilterModel()
  }

  setDefaultLimit (defaultLimitValue = 10) {
    this.filter.setDefaultLimit(defaultLimitValue)
  }

  setSpreadsCount (newSpreadsCount) {
    this.spreadsCount = Number(newSpreadsCount)

    return this
  }

  setOffset (pageNumber = 1) {
    this.filter.setOffset(this.filter.limit * (pageNumber - 1))
  }

  fillPair (filterValue, splittedPairIndex) {
    this.splittedPair[splittedPairIndex] = filterValue

    if (
      splittedPairIndex === SPLITTED_PAIR_SECOND_INDEX &&
      !FilterConfig.pair.right.find(filterElem => filterElem === filterValue)
    ) {
      this.splittedPair[splittedPairIndex] = ''

      this.filter.fillFilter('pair', this.splittedPair.join(''))
    }

    if (!this.splittedPair[SPLITTED_PAIR_FIRST_INDEX] || !this.splittedPair[SPLITTED_PAIR_SECOND_INDEX]) {
      this.filter.fillFilter('pair', '')

      return true
    }

    this.filter.fillFilter('pair', this.splittedPair.join(''))

    return true
  }

  fillAskExchange (filterValue) {
    if (!FilterConfig.exchanges.find(filterElem => filterElem === filterValue)) {
      this.askExchange = ''

      this.filter.fillFilter('askExchange', this.askExchange)

      return this
    }

    this.askExchange = filterValue

    this.filter.fillFilter('askExchange', this.askExchange)
  }
}
