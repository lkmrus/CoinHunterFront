import { Filter } from '~/models/Filter.js'

export class FilterPagination extends Filter {
  limit = 10
  offset = 0

  setDefaultLimit (defaultLimitValue = 10) {
    this.limit = defaultLimitValue
  }

  setOffset (newOffsetValue) {
    this.offset = newOffsetValue
  }

  fillFilter (filterKey, filterValue) {
    this.filter = {
      ...this.filter,
      [filterKey]: filterValue
    }
  }
}
