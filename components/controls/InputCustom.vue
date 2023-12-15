<template>
    <h5
        v-if="title"
        class="input-label"
    >
        {{ title }}
    </h5>
    <div
        class="input-custom"
        :class="[{'disabled': disabled}]"
    >
        <input
            v-model="proxyValue"
            class="input input_default"
            :class="[
                {'error': iError },
                {'focused': focused },
                {'active': proxyValue },
            ]"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :form="form"
            :max="max"
            :maxlength="maxlength"
            :name="name"
            :pattern="pattern"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :size="size"
            :step="step"
            :type="type"

            @input="onInput($event)"
            @change="onChange($event)"
            @focus="focused = true"
            @blur="focused = false"
        >
    </div>
    <div
        v-if="iError"
        class="input-error"
    >
        {{ iErrorName }}
    </div>
</template>

<script setup lang="ts">
import '@css/controls/input-custom.scss'

const props = defineProps({
  // Default Input Props
  autocomplete: { type: String, default: null },
  title: { type: String, default: null },
  disabled: { type: Boolean, default: null },
  form: { type: String, default: null },
  max: { type: Number, default: null },
  maxlength: { type: Number, default: null },
  min: { type: Number, default: null },
  minlength: { type: Number, default: null },
  name: { type: String, default: null },
  pattern: { type: String, default: null },
  placeholder: { type: String, default: null },
  readonly: { type: Boolean, default: null },
  required: { type: Boolean, default: null },
  size: { type: Number, default: null },
  step: { type: Number, default: null },
  type: {
    type: String as (() => 'tel' |
      'range' |
      'hidden' |
      'number' |
      'password' |
      'search' |
      undefined),
    default: null
  },
  modelValue: { type: [String, Number], default: null },

  // Custom Input Props
  bName: { type: String, default: null },
  iError: { type: Boolean, default: false },
  iErrorName: { type: String, default: null },
  bIcon: { type: String, default: null },

  // Input Types
  default: { type: Boolean, default: false }
})

const emit = defineEmits(['input', 'focus', 'change', 'update:modelValue'])

const proxyValue = ref<string | number>(props.modelValue)
const focused = ref<Boolean>(false)

const onInput = (event: any): void => {
  const newValue = (event.target as HTMLInputElement).value
  proxyValue.value = newValue
  emit('input', event.target.value)
  emit('update:modelValue', event.target.value)
}

const onChange = (event: any): void => {
  const newValue = (event.target as HTMLInputElement).value
  proxyValue.value = newValue
  emit('change', event.target.value)
}

watch(() => props.modelValue, (newValue) => {
  proxyValue.value = newValue
})

onMounted(() => {
  proxyValue.value = props.modelValue
})

</script>
