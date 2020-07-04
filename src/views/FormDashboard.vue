<template>
  <div class="home">


    <template v-if="form">
      <h1 >{{form.name}}</h1>
      <h2>Form info</h2>
      <table class="">
        <tr>
          <td>Form ID</td>
          <td>{{form._id}}</td>
        </tr>
        <tr>
          <td>Author</td>
          <td>{{form.author_id}}</td>
        </tr>

      </table>

      <h2>Fields</h2>
      <!-- Link to Form Builder -->

      <div class="">
        <router-link
          :to="{ name: 'form_builder', query: {id: $route.query.id} }">
          Form builder
        </router-link>
      </div>

      <div class="">
        <router-link
          :to="{ name: 'form', query: {id: $route.query.id} }">
          Publishable form
        </router-link>
      </div>



      <template v-if="form.fields">

        <table class="">
          <tr>
            <th>Label</th>
            <th>Type</th>
          </tr>
          <tr
            v-for="(field,i) in form.fields"
            v-bind:key="`field_${i}`">
            <td>{{field.label}}</td>
            <td>{{field.type}}</td>
          </tr>

        </table>
      </template>
      <div class="" v-else>
        No fields yet
      </div>


      <h2>Responses</h2>
      <template v-if="responses.length > 0">

        <table class="responses_table">
          <tr>
            <th
              v-for="key in response_keys"
              v-bind:key="key">{{key}}</th>
          </tr>
          <tr
            v-for="response in responses"
            v-bind:key="response._id">
            <td
              v-for="key in response_keys"
              v-bind:key="`${response._id}_${key}`">
              {{response[key]}}
            </td>
          </tr>

        </table>
      </template>

    </template>


  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Form',
  components: {

  },
  data(){
    return {
      form: null,
      responses: [],
      response_keys: [],
    }
  },
  mounted(){
    this.get_form()
  },
  methods: {
    get_form() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data
        this.get_all_responses()
      })
      .catch((error) => console.log(error))
    },
    get_all_responses() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.form._id}/responses`
      this.axios.get(url)
      .then((response) => {
        this.responses = []
        response.data.forEach((item) => {
          this.responses.push(item)

          // Save all the keys
          let ignored_keys = ['form_id', '_id']
          Object.keys(item).forEach((key) => {
            if(!this.response_keys.includes(key) && !ignored_keys.includes(key)) {
              this.response_keys.push(key)
            }
          })
        })
      })
      .catch((error) => console.log(error))
    }
  },

}
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
table tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}
table th, table td {
  padding: 0.25em;
}
</style>
