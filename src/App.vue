<template>
  <div class="container">
    <div>
      <employee-search></employee-search>
    </div>
  </div>
</template>

<script>
import EmployeeSearch from './components/EmployeeSearch.vue';

export default {
  components: {
    EmployeeSearch,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Ubuntu&display=swap');
*, *::before, *::after {
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
