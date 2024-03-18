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

    // TODO: Добавить логирование ошибок
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

    // TODO: Добавить логирование ошибок
  }
}
