<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-4 col-lg-4">
          <LeftSidebar/>
        </div>
        <div class="col-md-8 col-lg-8">
          <Nuxt />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import LeftSidebar from "../components/LeftSidebar";
    export default {
        name: "admin",
      components: {LeftSidebar, Navbar}
    }
</script>

<style scoped>

</style>
