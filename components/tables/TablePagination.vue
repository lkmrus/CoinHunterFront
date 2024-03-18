<template>
  <div class="pagination">
    <button
      class="pagination_button"
      @click="emitPageChange(currentPage - 1)"
    >
      <svg
        class="pagination_icon"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.99054 11.2895L14.6505 5.63955C14.7435 5.54582 14.8541 5.47143 14.976 5.42066C15.0978 5.36989 15.2285 5.34375 15.3605 5.34375C15.4925 5.34375 15.6233 5.36989 15.7451 5.42066C15.867 5.47143 15.9776 5.54582 16.0705 5.63955C16.2568 5.82691 16.3613 6.08036 16.3613 6.34455C16.3613 6.60873 16.2568 6.86219 16.0705 7.04955L11.1205 12.0495L16.0705 16.9995C16.2568 17.1869 16.3613 17.4404 16.3613 17.7045C16.3613 17.9687 16.2568 18.2222 16.0705 18.4095C15.9779 18.504 15.8675 18.5792 15.7456 18.6307C15.6237 18.6822 15.4928 18.709 15.3605 18.7095C15.2282 18.709 15.0973 18.6822 14.9755 18.6307C14.8536 18.5792 14.7432 18.504 14.6505 18.4095L8.99054 12.7595C8.88903 12.6659 8.80802 12.5523 8.75261 12.4258C8.69721 12.2993 8.6686 12.1627 8.6686 12.0245C8.6686 11.8864 8.69721 11.7498 8.75261 11.6233C8.80802 11.4968 8.88903 11.3832 8.99054 11.2895Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      v-for="(pageNumber, index) in pageArray"
      :key="index"
      class="pagination_elem"
      :class="{
        'pagination_elem-active': currentPage === pageNumber,
        'pagination_elem-empty': pageNumber === null,
      }"
      @click="emitPageChange(pageNumber)"
    >
      {{ pageNumber === null ? '...' : pageNumber }}
    </button>
    <button
      class="pagination_button"
      @click="emitPageChange(currentPage + 1)"
    >
      <svg
        class="pagination_icon"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0388 11.2895L10.3788 5.63955C10.2858 5.54582 10.1752 5.47143 10.0533 5.42066C9.93148 5.36989 9.80077 5.34375 9.66876 5.34375C9.53675 5.34375 9.40604 5.36989 9.28418 5.42066C9.16233 5.47143 9.05172 5.54582 8.95876 5.63955C8.77251 5.82691 8.66797 6.08036 8.66797 6.34455C8.66797 6.60873 8.77251 6.86219 8.95876 7.04955L13.9088 12.0495L8.95876 16.9995C8.77251 17.1869 8.66797 17.4404 8.66797 17.7045C8.66797 17.9687 8.77251 18.2222 8.95876 18.4095C9.05138 18.504 9.16182 18.5792 9.2837 18.6307C9.40557 18.6822 9.53645 18.709 9.66876 18.7095C9.80107 18.709 9.93195 18.6822 10.0538 18.6307C10.1757 18.5792 10.2861 18.504 10.3788 18.4095L16.0388 12.7595C16.1403 12.6659 16.2213 12.5523 16.2767 12.4258C16.3321 12.2993 16.3607 12.1627 16.3607 12.0245C16.3607 11.8864 16.3321 11.7498 16.2767 11.6233C16.2213 11.4968 16.1403 11.3832 16.0388 11.2895Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps({
  limit: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.count / props.limit))

const emitPageChange = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber
    emit('page-change', pageNumber)
  }
}

const pageArray = computed(() => {
  const pageArray = []

  if (window?.innerWidth <= 320) {
    for (let i = Math.max(1, currentPage.value - 1); i <= Math.max(3, currentPage.value + 1); i++) {
      pageArray.push(i)
    }

    return pageArray
  }

  if (window?.innerWidth <= 600) {
    for (let i = Math.max(1, currentPage.value - 2); i <= Math.max(5, currentPage.value + 2); i++) {
      pageArray.push(i)
    }

    return pageArray
  }

  for (let i = 1; i <= 2; i++) {
    pageArray.push(i)
  }

  if (currentPage.value === 2) {
    pageArray.push(currentPage.value + 1)
  }
  if (currentPage.value === 3) {
    pageArray.push(currentPage.value)
    pageArray.push(currentPage.value + 1)
  }
  if (currentPage.value === 4) {
    pageArray.push(currentPage.value - 1)
    pageArray.push(currentPage.value)
    pageArray.push(currentPage.value + 1)
  }

  if (currentPage.value > 4 && currentPage.value < totalPages.value - 3) {
    pageArray.push(null)
    pageArray.push(currentPage.value - 1)
    pageArray.push(currentPage.value)
    pageArray.push(currentPage.value + 1)
  }
  pageArray.push(null)

  if (currentPage.value === totalPages.value - 1) {
    pageArray.push(currentPage.value - 1)
  }
  if (currentPage.value === totalPages.value - 2) {
    pageArray.push(currentPage.value - 1)
    pageArray.push(currentPage.value)
  }
  if (currentPage.value === totalPages.value - 3) {
    pageArray.push(currentPage.value - 1)
    pageArray.push(currentPage.value)
    pageArray.push(currentPage.value + 1)
  }

  for (let i = totalPages.value - 1; i <= totalPages.value; i++) {
    pageArray.push(i)
  }

  return pageArray
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--font-family);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height);
  letter-spacing: 0em;
  text-align: left;
  &_elem,
  &_button {
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 17px;
    border-radius: 50%;
    color: var(--text-color, #ffffff);
    transition: all 0.3s ease 0s;
    background: var(--text-dark-blue, #2E2F4B);
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    &-active {
      background: #0047B380;
      border-color: var(--bg-blue, #0065FF);
    }
    &:not(&-empty) {
      cursor: pointer;
      //&:hover {
      //  background: #0047B380;
      //  border-color: var(--bg-blue, #0065FF);
      //}
    }
  }
  &_button {
    background: var(--bg-blue, #0065FF);;
  }
  &_icon {
    min-width: 24px;
    min-height: 24px;
  }
}
</style>
