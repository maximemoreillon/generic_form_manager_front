<template>
  <div class="create_form">
    <h1>Create new form</h1>
    <p>
      <router-link :to="{ name: 'forms'}">Back to my forms</router-link>
    </p>

    <form class="" @submit.prevent="submit()">
      <label>Name for your new form: </label>
      <input type="text" v-model="form_name" placeholder="Form name">
      <input type="submit">


    </form>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  data(){
    return {
      form_name: '',

    }
  },
  mounted(){
  },
  methods: {
    submit() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms`
      this.axios.post(url, {name: this.form_name})
      .then((response) => {
        this.$router.push({name: 'form_dashboard', query: {id: response.data.insertedId}})
      })
      .catch((error) => console.log(error))
    }
  }
}
</script>

<style scoped>
form {
  //text-align: center;
}

form > *:not(:last-child) {
  margin-right: 0.5em;
}

</style>
