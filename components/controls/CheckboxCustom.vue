<template>
  <div
    class="checkbox checkbox_default"
  >
    <input
      :id="id"
      :name="name"
      :checked="checked"
      type="checkbox"
      class="custom-checkbox"

      @click="handleClick($event)"
    >
    <label
      :for="id || name"
      class="checkbox__label"
    >
      <svg-icon
        v-if="checked"
        icon="checkmark"
        width="18"
        height="18"
        stroke="#0065FF"
        fill="#0065FF"
      />
      <slot>
        {{ text }}
      </slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import '@css/controls/checkbox-custom.scss'

const initialValue = ref<boolean>(false)

const props = defineProps({
  // Default Checkbox Props
  name: { type: String, default: null },
  id: { type: String, default: null },
  text: { type: String, default: null },
  checked: { type: Boolean, default: false },
  value: { type: Boolean, default: false },

  // Checkbox Types
  defaultType: { type: Boolean, default: false }
})

const emit = defineEmits(['input', 'click'])

watch(() => props.value, (newval) => {
  initialValue.value = newval
})

watch(() => props.checked, (newval) => {
  initialValue.value = newval
})

watch(() => initialValue, (val, oldVal) => {
  if (val !== oldVal) {
    emit('input', val)
  }
})

onMounted(() => {
  initialValue.value = props.checked
})

const handleClick = (e: any) => {
  emit('click', e)
  if (!e.isPropagationStopped) {
    initialValue.value = e.target.checked
  }
  return e
}
// provide('click', handleClick)

</script>
