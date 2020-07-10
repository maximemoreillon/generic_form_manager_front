<template>
  <div class="home">

    <template v-if="form">

      <h1 >{{form.name}}</h1>


      <template v-if="form.fields">

        <form class="" ref="form" @submit.prevent="submit()">
          <table class="">
            <tr
              v-for="(field,i) in form.fields"
              v-bind:key="`field_${i}`">

              <td>{{field.label}}</td>
              <td>
                <input
                  :type="field.type"
                  :placeholder="field.label"
                  v-model="field.response"
                  :name="field.label">
              </td>

            </tr>
            <tr>
              <td colspan="2">
                <input type="submit">
              </td>

            </tr>

          </table>
        </form>


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
    }
  },
  mounted(){
    this.get_form()
  },
  methods: {
    get_form() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}/fields`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    submit(){

      // Building the request vody (dirty)
      let body = {}
      this.form.fields.forEach( (field) => {
        body[field.label] = field.response
      })

      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}/responses`
      this.axios.post(url,body)
      .then(() => {
        this.$router.push({name: 'success'})
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
