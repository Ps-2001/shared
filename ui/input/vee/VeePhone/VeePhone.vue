<template>
  <Input
      :id="field?.id"
      :key="field?.id"
      :label="field?.label"
      :type="field?.type"
      :placeholder="field?.placeholder"
      :disabled="field?.disabled"
      :required="field?.required"
      :notification="notificationMessage"
      v-model="localValue"
      @change="changeValue"
  />
</template>

<script setup>
import { onMounted, ref, reactive, toRefs, watch, watchEffect, nextTick } from "vue";
import { Input } from "@/shared/ui/input";
import { FIELDS_PATTERNS } from "@/shared/config";

const props = defineProps(['field', 'modelValue'])
const emit = defineEmits(['setValid'])

const { field, modelValue } = toRefs(props);
const localValue = ref(modelValue.value || field.value.value);
const isValid = ref(false);
const pattern = ref(FIELDS_PATTERNS);
const defaultType = ref('tel');
let notificationMessage = reactive({});

watch(modelValue, newValue => localValue.value = newValue, { deep: true })
watch(localValue, newValue => !field ? emit('update:modelValue', newValue) : field.value.value = newValue)

const validate = value => {

  if (props.field?.required && !value && !props.field?.disabled) {
    // Поле обязательно для заполнения, но пустое
    isValid.value = false;
    notificationMessage.type = 'error'
    notificationMessage.text = 'Это поле обязательно для заполнения'

  }
  else if (!props.field?.required && !value || (pattern.value[props.field?.type || defaultType.value] && pattern.value[props.field?.type || defaultType.value].test(value)) ) {
    // Поле не обязательное или заполненное, и соответствует паттерну
    isValid.value = true
    notificationMessage.type = 'success'
    notificationMessage.text = ''

  } else if (pattern.value[props.field?.type || defaultType.value] && !pattern.value[props.field?.type || defaultType.value].test(value) && !props.field?.disabled) {
    // Поле заполнено, но не соответствует паттерну
    isValid.value = false;

    props.field?.validateText
        ? (notificationMessage.type = 'error', notificationMessage.text = props.field?.validateText)
        : (notificationMessage.type = 'error', notificationMessage.text = 'поле заполнено неправильно')

  } else {
    // Поле либо не обязательно, либо заполнено правильно
    isValid.value = true
    notificationMessage.type = 'success'
    notificationMessage.text = ''

  }

  props.field.value = localValue.value
  emit('setValid', { id: props.field?.id, valid: isValid.value })

}

const convert = event => {

  let convertedValue = localValue.value.replaceAll(/[^0-9+]/g, '');

  // Метод `startsWith()` в JavaScript используется для определения, начинается ли строка с символов указанной подстроки,
  // и возвращает `true` или `false` в зависимости от результата.
  if (convertedValue.startsWith('+') && !convertedValue.startsWith('+7')) {
    convertedValue = '+7' + convertedValue.slice(1)
  }

  if (!convertedValue.startsWith('+7')) {
    convertedValue = '+7' + convertedValue
  }

  if (convertedValue.startsWith('+7')) {

    if (convertedValue.slice(2, 4) === '+7') convertedValue = '+7' + convertedValue.slice(4)
    if (convertedValue.slice(2, 3) === '8')  convertedValue = '+7' + convertedValue.slice(3)

  }

  localValue.value = convertedValue
  validate(convertedValue)
  emit('update:modelValue', convertedValue)

}
const changeValue = () => {
  convert()
  emit('change', { name: 'change-TEL', value: localValue.value, valid: isValid.value })
}

onMounted(() => {
  convert()
})
// watch(props.field.value, () => {
//   convert()
//   validate(localValue.value)
// }, { immediate: true })

watch(localValue, () => {
  validate(localValue.value)
}, { immediate: true })

</script>

<style scoped>

</style>