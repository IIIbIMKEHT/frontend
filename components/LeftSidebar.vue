<template>
  <div class="card" style="width: 18rem;">
    <img src="~assets/img/no-image.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{user.name}}</h5>
      <p class="card-text">{{user.email}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <nuxt-link to="/profile"><li class="list-group-item"><fa :icon="['fas','user']" class="mr-2"/>Мой профиль</li></nuxt-link>
      <nuxt-link to="/category"><li class="list-group-item"><fa :icon="['fas','list']" class="mr-2"/>Категории</li></nuxt-link>
      <nuxt-link to="/profile"><li class="list-group-item"><fa :icon="['fas','blog']" class="mr-2"/>Посты</li></nuxt-link>
      <nuxt-link to="/settings"><li class="list-group-item"><fa :icon="['fas','cogs']" class="mr-2"/>Настройки</li></nuxt-link>
    </ul>
    <div class="card-body">
      <a @click="logout" class="card-link">Выйти</a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "LeftSidebar",
      methods: {
        logout() {
          this.$auth.logout()
        }
      }
    }
</script>

<style scoped>

</style>
