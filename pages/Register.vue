<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 col-lg-6">
        <h2>Register Page</h2>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputName">Name</label>
            <input type="text" v-model.trim="form.name" autofocus class="form-control" id="exampleInputName">
            <small class="form-text text-danger" v-if="errors.name">{{errors.name[0]}}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model.trim="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
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
              .then(data => {
                try {
                  this.$auth.loginWith("local", {
                    data: {
                      email: this.form.email,
                      password: this.form.password
                    }
                  })

                } catch (e) {

                  return;
                }
                this.$router.push({
                  path: this.$route.query.redirect || "/profile"
                })
                console.log(data);
              })
              .catch(err => {
                console.log(err);
              });
          }
      }
    }
</script>

<style scoped>

</style>
