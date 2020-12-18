<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 col-lg-6">
        <h2>Login Page</h2>
        <small class="form-text text-danger" v-if="errors.fail">{{errors.fail[0]}}</small>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model.trim="form.email" autofocus class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1">
            <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      middleware: ['guest'],
        name: "Login",
        data() {
          return {
            form: {
              email: '',
              password: ''
            }
          }
        },
      methods: {
          async submit() {
            try {
              this.$toast.show('Logging in...')
              await this.$auth.loginWith("local", {
                data: this.form
              })
              this.$toast.success('Successfully authenticated')
            } catch (e) {
              this.$toast.error('Error while authenticating')
              return;
            }
            this.$router.push({
              path: this.$route.query.redirect || "/profile"
            })
          }
      }
    }
</script>

<style scoped>

</style>
