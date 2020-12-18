<template>
  <div class="container">
    <div class="row align-items-center">
      <h1>Category Page</h1>
      <div class="ml-auto">
        <a @click.prevent="show"><fa :icon="['fas','plus']" class="clickable mr-2"/></a>
      </div>
      <!-- Modal -->
      <modal name="example">
        <div class="container">
          <h2 class="mt-2">{{editModal ? 'Редактировать категорию' : 'Новая категория'}}</h2>
          <hr>
          <form @submit.prevent="editModal ? updateCategory() : create()">
            <input type="text" class="form-control" v-model="form.title" placeholder="новая категория">
            <small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
            <button type="submit" class="btn btn-primary mt-3">{{editModal ? 'Обновить' : 'Сохранить'}}</button>
          </form>
        </div>
      </modal>

    </div>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Наименование</th>
        <th scope="col">Дата создания</th>
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(topic, index) in topics.data" :key="topic.id">
        <th scope="row">{{index + 1}}</th>
        <td>{{topic.title}}</td>
        <td>{{topic.created_at}}</td>
        <td>
          <div class="row justify-content-center">
            <fa @click.prevent="edit(topic)" :icon="['fas','edit']" class="clickable mr-2"/>
            <fa @click="deleteCategory(topic.id)" :icon="['fas','trash']" class="clickable mr-2 text-danger"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-for="(link, index) in numbers" :key="index" :class=" link.active ? 'page-item active' : 'page-item'">
          <a v-if="link.url != null" @click="getResults(link.url)" class="page-link" href="javascript:void (0)"><span v-html="link.label"></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script>
  export default {
    middleware: ['auth'],
    layout: 'admin',
    name: "Category",
    data() {
      return {
        topics: [],
        numbers: [],
        form: {
          id: '',
          title: ''
        },
        editModal: false
      }
    },

    methods: {
      async getResults(link) {
        await this.$axios.get(link).then(({data}) => (
          [
            this.topics = data,
            this.numbers = data.meta.links,
          ]
        ))
      },
      loadCategories() {
        this.$axios.get('/topics').then(({data}) => (
          [
            this.topics = data,
            this.numbers = data.meta.links,
          ]
        ))
      },
      async create() {
        try {
          await this.$axios.$post('topics/create', this.form)
          this.$toast.success('Категория успешно создана')
          this.$emit('AfterCreate');
          this.$modal.hide('example')
        } catch (e) {

          return;
        }
        this.$router.push({
          path: this.$route.query.redirect || '/category'
        })
      },
      async updateCategory() {
        try {
          await this.$axios.$post('topics/update/' + this.form.id, this.form)
          this.$toast.success('Категория успешно обновлена')
          this.$emit('AfterCreate');
          this.$modal.hide('example')

        } catch (e) {

          return;
        }
        this.$router.push({
          path: this.$route.query.redirect || '/category'
        })
      },
      show() {
        this.editModal = false
        this.form.id = ''
        this.form.title = ''
        this.$modal.show('example')
      },
      edit(topic) {
        this.editModal = true
        this.$modal.show('example')
        this.form.title = topic.title
        this.form.id = topic.id
      },
      deleteCategory(id) {
        try {
          this.$axios.$get('topics/delete/' + id)
          this.$toast.error('Категория успешно удалена')
          this.$emit('AfterCreate');
        } catch (e) {

          return;
        }
        this.$router.push({
          path: this.$route.query.redirect || '/category'
        })
      }
    },
    created() {
      this.loadCategories()
      this.$on('AfterCreate', () => {this.loadCategories()});
    }

  }
</script>

<style scoped>
  .clickable {
    cursor: pointer
  }
</style>
