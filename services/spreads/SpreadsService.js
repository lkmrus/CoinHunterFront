import { useFetch } from '#app'
import { SpreadData } from '~/DTO/SpreadData.js'

export class SpreadsService {
  async getSpreadList (filter) {
    const { data, error } = await useFetch('/api/exchanges/spread-history', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter)
    })

    if (data.value) {
      return data.value.map(arbitrageRecord => new SpreadData(arbitrageRecord))
    }

    throw new Error(`Fetch error with: ${error}`)
  }

  async getSpreadsCount (filter) {
    const { data, error } = await useFetch('/api/exchanges/spread-history/count', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter)
    })

    if (data.value) {
      return data.value.count
    }

    throw new Error(`Fetch error with: ${error}`)
  }
}
