<template>
  <div class="container">
    <h1>Settings Page</h1>
  </div>
</template>

<script>
    export default {
      layout: 'admin',
      middleware: ['auth'],
        name: "settings",

    }
</script>

<style scoped>

</style>
