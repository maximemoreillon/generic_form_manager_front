<template>
  <div class="home">

    <template v-if="form">

      <h1>{{form.name}}</h1>


      <div
        class="table_wrapper"
        v-if="form.fields">

        <form class="" ref="form" @submit.prevent="submit()">
          <table class="">
            <tr
              v-for="(field,field_index) in form.fields"
              v-bind:key="`field_${field_index}`">

              <td>{{field.label}}</td>
              <td>
                <select
                  v-if="field.type === 'select'"
                  v-model="field.response">
                  <option
                    v-for="(option, option_index) in field.options"
                    v-bind:key="`field_${field_index}_option_${option_index}`"
                    :value="option.value">
                    {{option.value}}
                  </option>
                </select>
                <input
                  v-else
                  :type="field.type"
                  :placeholder="field.label"
                  v-model="field.response"
                  :name="field.label">
              </td>

            </tr>
          </table>

          <div class="centered">
            <input style="display:none;" type="submit">
            <button
              type="button"
              class="bordered"
              @click="submit()">
              <send-icon />
              <span>Send</span>
            </button>
          </div>

        </form>


      </div>

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

      const form_id = this.$route.params.form_id

      const url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${form_id}/fields`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    submit(){

      // Building the request body (dirty)
      const body = this.form.fields.reduce( (acc, field) => {
        acc[field.label] = field.response
        return acc
      },{})

      const form_id = this.$route.params.form_id

      const url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${form_id}/responses`
      this.axios.post(url,body)
      .then(() => { this.$router.push({name: 'success'}) })
      .catch((error) => {
        alert(error)
        console.log(error)
      })


    }

  },

}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}
table th, table td {
  padding: 0.5em 0;
}

input[type="text"],
select {
  width: 100%;
}




</style>
