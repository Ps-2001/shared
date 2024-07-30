<template>
  <Textarea
      :id="field?.id"
      :key="field?.id"
      :label="field?.label"
      :type="field?.type"
      :placeholder="field?.placeholder"
      :disabled="field?.disabled"
      :required="field?.required"
      :notification="notificationMessage"
      :rows="field?.specialized?.rows || rows"
      :max="field?.specialized?.max || max"
      v-model="localValue"
  />
</template>

<script setup>
import { onMounted, ref, reactive, toRefs, watch, watchEffect } from "vue";
import { Textarea } from "@/shared/ui/input";
import { FIELDS_PATTERNS } from "@/shared/config";

const props = defineProps(['field', 'modelValue', 'rows', 'max'])
const emit = defineEmits(['setValid'])


const { field, modelValue } = toRefs(props);
const localValue = ref(modelValue.value || field.value.value);
const isValid = ref(false);
const pattern = ref(FIELDS_PATTERNS);
const defaultType = ref('email');
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
  else if (!props.field?.required && !value || (pattern.value[props.field?.type || defaultType] && pattern.value[props.field?.type || defaultType].test(value)) ) {
    // Поле не обязательное или заполненное, и соответствует паттерну
    isValid.value = true
    notificationMessage.type = 'success'
    notificationMessage.text = ''

  } else if (pattern.value[props.field?.type || defaultType] && !pattern.value[props.field?.type || defaultType].test(value) && !props.field?.disabled) {
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

  emit('setValid', { id: props.field?.id, valid: isValid.value })

}

watch(props.field, () => {
  validate(localValue.value)
}, { immediate: true })

watch(localValue, () => {
  validate(localValue.value)
}, { immediate: true })

</script>

<style scoped>

</style>