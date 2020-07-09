import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.config.productionTip = false

// Redirect to login screen if not logged in (i.e. does not have JWT in cookies)
router.beforeEach((to, from, next) => {

  if(VueCookies.get('jwt')) {

    axios.defaults.headers.common['Authorization'] = `Bearer ${Vue.$cookies.get('jwt')}`

    // Retrieve username
    axios.get(`${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`)
    .then(response => {
      store.commit('set_user',response.data)
      next()
    })
    .catch(error => {
      if(error.response) console.log(error.response.data)
      else console.log(error)
      alert('Could not authenticate the current user')
    })

  }
  else {
    delete axios.defaults.headers.common['Authorization']
    window.location.href = process.env.VUE_APP_AUTHENTICATION_FRONT_URL;
  }




});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
