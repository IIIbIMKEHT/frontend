<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 col-lg-6">
        <h2>Login Page</h2>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputName">Name</label>
            <input type="text" v-model.trim="form.name" autofocus class="form-control" id="exampleInputName">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model.trim="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data() {
        return {
          form: {
            name: '',
            email: '',
            password: '',
          }
        }
      },
      methods: {
          async submit() {
            await this.$axios.$post('register', this.form)
            await this.$auth.loginWith('local', {
              data: {
                email: this.form.email,
                password: this.form.password
              }
            })

            this.$router.push('/')
          }
      }
    }
</script>

<style scoped>

</style>
