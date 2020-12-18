<template>
  <div class="container">
    <h1>Profile Page</h1>
  </div>
</template>

<script>
    export default {
      layout: 'admin',
      middleware: ['auth'],
        name: "profile",
      data() {
        return {

        }
      },

    }
</script>

<style scoped>
  .card-link {
    cursor: pointer;
  }
</style>
