import { FilterConfig } from '~/configs/FilterConfig.js'

const SPLITTED_PAIR_FIRST_INDEX = 0
const SPLITTED_PAIR_SECOND_INDEX = 1

export class FilterService {
  splittedPair = []
  splittedAskExchange = []

  spreadsCount = 0

  constructor (FilterModel) {
    this.filter = new FilterModel()
  }

  setDefaultLimit (defaultLimitValue = 10) {
    this.filter.setDefaultLimit(defaultLimitValue)
  }

  setSpreadsCount (newSpreadsCount) {
    this.spreadsCount = newSpreadsCount

    return this
  }

  setOffset (pageNumber = 1) {
    this.filter.setOffset(this.filter.limit * (pageNumber - 1))
  }

  fillPair (filterValue, splittedPairIndex) {
    // if (
    //   splittedPairIndex === SPLITTED_PAIR_FIRST_INDEX &&
    //   filterValue === ''
    // ) {
    //   this.splittedPair[splittedPairIndex] = ''
    //
    //   this.filter.fillFilter('pair', this.splittedPair.join(''))
    //
    //   return true
    // }
    if (
      splittedPairIndex === SPLITTED_PAIR_SECOND_INDEX &&
      !FilterConfig.pair.right.find(filterElem => filterElem === filterValue)
    ) {
      this.splittedPair[splittedPairIndex] = ''

      this.filter.fillFilter('pair', this.splittedPair.join(''))

      return true
    }

    this.splittedPair[splittedPairIndex] = filterValue

    // if (!this.splittedPair[SPLITTED_PAIR_FIRST_INDEX] && !this.splittedPair[SPLITTED_PAIR_SECOND_INDEX]) {
    //   return false
    // }

    this.filter.fillFilter('pair', this.splittedPair.join(''))

    return true
  }

  fillAskExchange (filterValue, event = 'change') {
    if (!FilterConfig.exchanges.find(filterElem => filterElem === filterValue)) {
      this.splittedAskExchange = []

      this.filter.fillFilter('ask-exchange', this.splittedAskExchange.join(''))

      return this
    }
    if (event === 'change') {
      this.splittedAskExchange.push(filterValue)
    }
    if (event === 'remove') {
      const exchangeToDropIndex = this.splittedAskExchange.indexOf(filterValue)

      if (exchangeToDropIndex !== -1) {
        this.splittedAskExchange.splice(exchangeToDropIndex, 1)
      }
    }

    this.filter.fillFilter('ask-exchange', this.splittedAskExchange.join(''))
  }
}
