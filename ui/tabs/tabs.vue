<template>
  <div>
    <!-- меню вкладок -->
    <div class="header">
      <IconArrowLeft @click="elemScroll({ elem: ListTabs, orin: 'gor', value: -100, smooth: true })" class="arrow" :class="{ disabled: isAtStart }" width="12" color="#188787" />

      <ul class="tabs" ref="ListTabs">
        <li
            v-for="(tab, index) in arrTabs" :key="index"
            @click="selectTab(tab)"
        >
          <Tab
              :index="index"
              :tab="tab"
              :edit="edit"
              :valid="tab?.id in (arValids || {}) ? arValids?.[tab.id] : true"
              @delete="removeTab">

          </Tab>
        </li>
      </ul>

      <IconArrowRight @click="elemScroll({ elem: ListTabs, orin: 'gor', value: 100 })" class="arrow" :class="{ disabled: isAtEnd }" width="12" color="#188787" />
      <IconPlus v-if="edit && (limit || 10 > arrTabs.length)" class="header-add" @click="addNewTab" width="24" border="#188787" />
    </div>

    <!-- содержимое вкладки -->
    <div class="tab-content">
      <IconPlus
          v-if="edit && (limit || 10 > arrTabs.length)"
          class="tab-content-add"
          @click="addNewTab"
          width="24" border="#188787"
      />
      <slot></slot>
    </div>

  </div>

</template>

<script setup>
import Tab from './tab/tab.vue'
import { IconArrowLeft, IconArrowRight, IconPlus } from "@/shared/ui/icons"
import { elemScroll } from "@/shared/lib/useDom.js";
import { onMounted, ref, reactive, watch, computed, onUnmounted } from 'vue';

const props = defineProps(['selectId', 'tabs', 'edit', 'arValids', 'limit'])
const emit = defineEmits(['select', 'add', 'remove', 'update'])

const arrTabs = ref()
const ListTabs = ref()
const scrollPosition = ref(0)

// Проверка, находится ли скролл в начальной позиции
let isAtStart = computed(() => scrollPosition.value === 0)
// Проверка, виден ли весь список вкладок
let isAtEnd = computed(() =>  ListTabs.value ? Math.round(scrollPosition.value) >= Math.round(ListTabs.value.scrollWidth - ListTabs.value.clientWidth) : false)

const selectTab = selectedTab => {
  arrTabs.value.forEach(tab => tab.isActive = tab === selectedTab)
  emit('select', selectedTab.id)
}

const addNewTab = () => {

  const newTabName = `${arrTabs.value[0].elemName || 'Вкладка'} ${arrTabs.value.length + 1}`
  const newTabId = arrTabs.value.length + 1
  const newTab = reactive({ id: newTabId, name: newTabName, edit: true, isActive: false });

  emit('add', { tab: newTab })
  arrTabs.value.push(newTab);
  selectTab(newTab);

}

const removeTab = ({ tab: tabToRemove }) => {

  const index = arrTabs.value.indexOf(tabToRemove);
  if (index === -1) return;

  emit('remove', { tab: tabToRemove })
  arrTabs.value.splice(index, 1);

  // Если удаляемая вкладка была активной, активируем другую вкладку
  if (tabToRemove.isActive && arrTabs.value.length > 0) {
    const newActiveIndex = index === arrTabs.value.length ? index - 1 : index;
    arrTabs.value[newActiveIndex].isActive = true;
    selectTab(arrTabs.value[newActiveIndex]);
  }

}

// Обновление позиции скролла
const updatePosition = () => scrollPosition.value = ListTabs.value.scrollLeft

// Следим за изменениями в props.tabs и обновляем arrTabs
watch(() => props.tabs, (newTabs) => {
  arrTabs.value = newTabs.map(tab => ({ ...tab, isActive: tab.id === props.selectId }));
}, { deep: true, immediate: true })


watch(arrTabs, newValue => {
  emit('update', newValue)
}, { immediate: true, deep: true  })

onMounted(() => ListTabs.value.addEventListener('scroll', updatePosition))
onUnmounted(() => ListTabs.value ? ListTabs.value.removeEventListener('scroll', updatePosition) : null)

</script>

<style scoped lang="sass">
.disabled
  opacity: .4
  pointer-events: none

.header
  display: flex
  white-space: nowrap
  .arrow
    cursor: pointer
    padding: 0 12px
  &-add
    padding: 0 3px
    cursor: pointer

.tabs
  display: flex
  overflow-x: auto
  scrollbar-width: none
  flex-wrap: nowrap
  list-style-type: none
  padding: 0
  scroll-behavior: smooth
  user-select: none
  &::-webkit-scrollbar
    display: none

  & li
    display: flex
    align-items: center


.tab-content
  position: relative
  padding: 1.8rem 2.6rem
  background-color: white
  &-add
    display: flex
    cursor: pointer
    margin-left: auto
    margin-bottom: 20px

.wrapper
  display: flex
  flex-direction: column
  align-items: center

@import "custom"
</style>