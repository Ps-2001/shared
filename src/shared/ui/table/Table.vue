<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="header.key" :style="{ width: header.width + 'px' }">
        {{ header.label }}
        <span class="resizer" @mousedown="startResize($event, header)"></span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <td v-for="header in headers" :key="header.key">
        {{ item[header.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue';

const headers = ref([
  { key: 'name', label: 'Имя', width: 200 },
  { key: 'age', label: 'Возраст', width: 100 },
  { key: 'email', label: 'Email', width: 300 },
]);

const items = ref([
  { id: 1, name: 'Иван Иванов', age: 30, email: 'ivanov@example.com' },
]);

let startX, startWidth, activeHeader;

const startResize = (event, header) => {
  startX = event.clientX;
  startWidth = header.width;
  activeHeader = header;
  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
};

const doResize = (event) => {
  if (activeHeader) {
    const newWidth = startWidth + event.clientX - startX;
    activeHeader.width = newWidth > 50 ? newWidth : 50; // Минимальная ширина столбца
  }
};

const stopResize = () => {
  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);
  activeHeader = null;
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

thead {
  background-color: #eee;
}

.resizer {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  user-select: none;
  background-color: #ccc;
}

/* Дополнительные стили для улучшения внешнего вида */
</style>
