<template>
  <table>
    <thead>
    <tr>
      <th>Заголовок 1</th>
      <th>Заголовок 2</th>
      <!-- Другие заголовки -->
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in jsonData" :key="index">
      <td>{{ item.property1 }}</td>
      <td>
        <table>
          <tr v-for="(nestedItem, nestedIndex) in item.nestedProperty" :key="nestedIndex">
            <td>{{ nestedItem.nestedProperty1 }}</td>
            <!-- Другие ячейки для вложенных данных -->
          </tr>
        </table>
      </td>
      <!-- Другие ячейки для основных данных -->
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const data = [

]

const jsonData = ref([
      {
        "id": 1,
        "name": "Элемент 1",
        "details": [
          {
            "detailId": 1,
            "description": "Детальное описание 1"
          },
          {
            "detailId": 2,
            "description": "Детальное описание 2"
          }
        ]
      },
      {
        "id": 2,
        "name": "Элемент 2",
        "details": [
          {
            "detailId": 1,
            "description": "Детальное описание 1"
          },
          {
            "detailId": 2,
            "description": "Детальное описание 2"
          }
        ]
      }
    ]
)
</script>

<style scoped lang="sass">

</style>