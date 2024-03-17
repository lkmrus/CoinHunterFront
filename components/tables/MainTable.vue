<template>
  <div class="table">
    <table class="table__content">
      <thead>
        <tr>
          <th
            v-for="(item, itemIndex) in tableHeader"
            :key="`header-item-${itemIndex}`"
            :class="{'wide': item.is_wide}"
          >
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in tableBody"
          :key="`row-${row.id}`"
        >
          <td
            v-for="column in tableColumns"
            :key="`column-${column}`"
            class="table_column"
            :class="`table_column-${column}`"
          >
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  tableHeader: {
    type: Object,
    required: true
  },
  tableBody: {
    type: Array,
    required: true
  },
  tableColumns: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.table{
  max-width: 100%;
  overflow-x: auto;
  &_column {
    &-createdDate {
      white-space: nowrap;
      font-size: 12px;
    }
  }
  &__content{
    width: 100%;
    thead{
      width: 100%;
      height: 52px;
      background: var(--bg-table);
      white-space: nowrap;
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
        //min-width: 160px;
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
        padding: 16px 20px;
      }
      .wide{
        min-width: 200px;
      }
    }
  }
}
</style>
