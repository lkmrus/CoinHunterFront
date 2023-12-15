<template>
    <section class="table">
        <h2 class="table__title">
            Таблица
        </h2>
        <div class="table__content">
            <table>
                <thead>
                    <tr>
                        <th>
                            Пара
                        </th>
                        <th class="wide">
                            Биржи
                        </th>
                        <th>
                            Прибыль
                        </th>
                        <th>
                            Цена покупки
                        </th>
                        <th>
                            Цена продажи
                        </th>
                        <th class="wide">
                            Время обновления (GMT+3)
                        </th>
                        <th>
                            TG уведомления
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, rowIndex) in infoRows"
                        :key="`row-${rowIndex}`"
                    >
                        <td>{{ row.pair }}</td>
                        <td>{{ row.exchanges }}</td>
                        <td>{{ row.income }}</td>
                        <td>{{ row.purchasePrice }}</td>
                        <td>{{ row.sellingPrice }}</td>
                        <td>{{ row.updateTime }}</td>
                        <td>{{ row.notifications }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
const infoRows = [
  {
    pair: 'USDT/BTC',
    exchanges: 'Binance/Poloniex',
    income: '0.12',
    purchasePrice: '1.12',
    sellingPrice: '1.24',
    updateTime: '22:16 3 ноя 2023',
    notifications: '30 min'
  },
  {
    pair: 'USDT/BTC',
    exchanges: 'Binance/Poloniex',
    income: '0.12',
    purchasePrice: '1.12',
    sellingPrice: '1.24',
    updateTime: '22:16 3 ноя 2023',
    notifications: '30 min'
  }
]
</script>

<style lang="scss" scoped>
.table{
    margin-top: 112px;
    &__title{
        margin-bottom: 24px;
    }
    &__content{
        max-width: 100%;
        overflow-x: auto;
        thead{
            width: 100%;
            height: 52px;
            background: var(--bg-table);
        }
        tbody{
            tr{
                height: 60px;
                border-top: 1px solid #000;
                background: var(--box-color);
            }
        }
        tr{
            @include text-xs-mixin;
            th{
                min-width: 160px;
                padding: 8px 20px;
                &:first-child{
                    border-radius: 16px 0px 0px 0px;
                }
                &:last-child{
                    border-radius: 0px 16px 0px 0px;
                }
            }
            td{
                text-align: center;
                min-width: 160px;
                padding: 16px 20px;
            }
            .wide{
                min-width: 200px;
            }
        }
    }
}
</style>
