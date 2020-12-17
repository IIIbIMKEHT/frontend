import Vue from 'vue'
import {mapGetters} from 'vuex'

const User = {
  install(Vue, options) {
    Vue.mixin({
        computed: {
          ...mapGetters({
            user: 'Auth/user',
            authenticated: 'Auth/authenticated'
          })
        }
      }
    )
  }
}

Vue.use(User);
