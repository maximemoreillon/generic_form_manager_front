<template>
  <div class="hello">
    <form class="" @submit.prevent="submit()">
      <label>Form name</label>
      <input type="text" v-model="form_name" placeholder="Form name">
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateNewForm',
  data() {
    return {
      form_name: '',
    }
  },
  methods: {
    submit() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms`
      this.axios.post(url, {name: this.form_name})
      .then((response) => {console.log(response.data)})
      .catch((error) => console.log(error))
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
