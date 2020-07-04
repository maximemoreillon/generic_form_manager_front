<template>
  <div class="home">
    <CreateNewForm/>

    <router-link
      :to="{ name: 'form', query: {id: form._id} }"
      v-for="form in forms"
      v-bind:key="form._id"
      class="form">
      {{form.name}}
    </router-link>





  </div>
</template>

<script>
// @ is an alias to /src
import CreateNewForm from '@/components/CreateNewForm.vue'

export default {
  name: 'Home',
  components: {
    CreateNewForm
  },
  data(){
    return {
      forms: [],
    }
  },
  mounted(){
    this.get_forms_of_user()
  },
  methods: {
    get_forms_of_user() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms`
      this.axios.get(url)
      .then((response) => {
        this.forms = []
        response.data.forEach((form) => {
          this.forms.push(form)
        })
      })
      .catch((error) => console.log(error))
    }
  }
}
</script>
