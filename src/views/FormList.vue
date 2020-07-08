<template>
  <div class="home">

    <h1>My forms</h1>
    <p>Click <router-link :to="{ name: 'create_form'}">here</router-link> to create a new form</p>



    <router-link
      class="form"
      :to="{ name: 'form_dashboard', query: {id: form._id} }"
      v-for="form in forms"
      v-bind:key="form._id"
      >
      {{form.name}}
    </router-link>





  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'FormList',
  components: {

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

<style scoped>
.form {
  display: block;
  padding: 0.25em;
  border: 1px solid #dddddd;
  color: currentcolor;
  text-decoration: none;
  margin: 0.25em 0;
}

.form:hover {
  background-color: #eeeeee;
}
</style>
