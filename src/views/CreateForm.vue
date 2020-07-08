<template>
  <div class="create_form">
    <h1>Create new form</h1>

    <form class="" @submit.prevent="submit()">
      <div class="">
        <label>Form name:</label>
        <input type="text" v-model="form_name" placeholder="Form name">
      </div>

      <div class="">
        <input type="submit">
      </div>


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
  display: flex;
  flex-direction: column;
  align-items: center;
}

form > div {
  margin: 0.5em;
}

label {
  margin-right: 1em;
}
</style>
