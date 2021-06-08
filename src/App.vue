<template>
  <div id="app">
    <ToDo/>
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue'

export default {
  name: 'App',
  components: {
    ToDo
  }
}
</script>

<style>
@import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
  background: #F0EFE9;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Open Sans', sans-serif;
}

#app {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #333;
  width: 100%;
  height: 85vh;
  margin: auto;
  max-width: 500px;
}

p, h1, input, span, div {
  font-family: 'Open Sans', sans-serif;
}
</style>
