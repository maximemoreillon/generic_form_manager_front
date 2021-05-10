<template>
  <div class="home">


    <template v-if="form">
      <h1>{{form.name}}</h1>
      <p>
        <router-link :to="{ name: 'forms'}">Back to my forms</router-link>
      </p>

      <!-- Form Info table -->
      <h2>Form info</h2>
      <table class="">
        <tr>
          <td>ID</td>
          <td>{{form._id}}</td>
        </tr>

        <tr>
          <td>Date</td>
          <td>{{format_date(form.date)}}</td>
        </tr>

        <tr>
          <td>API URL</td>
          <td>
            <input
              class="api_url"
              type="text"
              readonly
              :value="`${api_url}/forms/${form._id}?token=${$cookies.get('jwt')}`">
          </td>
        </tr>

        <tr>
          <td>Delete form</td>
          <td>
            <button
              type="button"
              class=""
              @click="delete_form()">
              <delete-icon />
            </button>
          </td>
        </tr>
      </table>




      <h2>Fields</h2>
      <!-- Link to Form Builder -->


      <template v-if="form.fields">
        <template v-if="form.fields.length > 0">

          <p class="">
            <router-link
              :to="{ name: 'form_builder', params: {form_id: form._id} }">
              Form builder
            </router-link>
          </p>


          <p>
            <router-link
              :to="{ name: 'form', params: {form_id: form._id} }">
              Publishable form
            </router-link>
          </p>

          <table class="">
            <tr>
              <th>Label</th>
              <th>Type</th>
              <th>Options</th>
            </tr>
            <tr
              v-for="(field,field_index) in form.fields"
              v-bind:key="`field_${field_index}`">
              <td>{{field.label || '-'}}</td>
              <td>{{field.type}}</td>
              <td>
                <table v-if="field.type==='select'">

                  <tr
                    v-for="(option, option_index) in field.options"
                    v-bind:key="`field_${field_index}_option${option_index}`">
                    <td>{{option.value || '-'}}</td>

                  </tr>
                </table>
                <span v-else>-</span>
              </td>
            </tr>

          </table>
        </template>
        <div v-else class="">
          No fields yet, click <router-link :to="{ name: 'form_builder', params: {form_id: form._id} }"> here </router-link> to create some.
        </div>
      </template>
      <div v-else class="">
        No fields yet, click <router-link :to="{ name: 'form_builder', params: {form_id: form._id} }"> here </router-link> to create some.
      </div>






      <h2>Responses</h2>
      <template v-if="form.responses">
        <table class="responses_metadata">
          <tr>
            <td>
              Response count
            </td>
            <td>
              {{form.responses.length}}
            </td>
          </tr>
          <tr>
            <td>API URL</td>
            <td>
              <input
              class="api_url"
              type="text"
              readonly
              :value="`${api_url}/forms/${form._id}/responses?token=${$cookies.get('jwt')}`">
            </td>
          </tr>
          <tr>
            <td>Excel export</td>
            <td>
              <button
                type="button"
                class=""
                @click="excel_export()">
                <download-icon />
              </button>
            </td>
          </tr>

        </table>

        <h3>Responses content</h3>


        <table
          id="responses_table"
          class="responses_table">
          <tr>
            <th
              v-for="key in response_keys"
              v-bind:key="key">{{key}}</th>

              <th>Delete</th>
          </tr>
          <tr
            v-for="(response, response_index) in form.responses"
            v-bind:key="response._id">
            <td
              v-for="key in response_keys"
              v-bind:key="`${response._id}_${key}`">
              {{response[key]}}
            </td>

            <td>
              <button
                type="button"
                @click="delete_response(response_index)">

                <delete-icon />
              </button>
            </td>
          </tr>

        </table>

        <table
          id="export_table">
          <tr>
            <th
              v-for="key in response_keys"
              v-bind:key="key">{{key}}</th>
          </tr>
          <tr
            v-for="response in form.responses"
            v-bind:key="response._id">
            <td
              v-for="key in response_keys"
              v-bind:key="`${response._id}_${key}_export`">
              {{response[key]}}
            </td>
          </tr>

        </table>


      </template>
      <div class="" v-else>
        No responses yet
      </div>

    </template>


  </div>
</template>

<script>
// @ is an alias to /src
import XLSX from 'xlsx'

export default {
  name: 'Form',
  components: {

  },
  data(){
    return {
      form: null,
      response_keys: [],
      loading: false,
      api_url : process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL,
    }
  },
  mounted(){
    this.get_form()
  },
  methods: {
    get_form() {
      this.loading = true

      const form_id = this.$route.params.form_id

      const url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${form_id}`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data

        // Save all the keys
        if(this.form.responses){
          this.form.responses.forEach((item) => {
            let ignored_keys = ['form_id', '_id']
            Object.keys(item).forEach((key) => {
              if(!this.response_keys.includes(key) && !ignored_keys.includes(key)) {
                this.response_keys.push(key)
              }
            })
          })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => this.loading = false)
    },
    delete_form() {
      if(!confirm('ホンマ？')) return
      const url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.form._id}`
      this.axios.delete(url)
      .then(() => { this.$router.push({name: 'forms'}) })
      .catch((error) => console.log(error))
    },
    delete_response(response_index) {
      const url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.form._id}/responses/${response_index}`
      this.axios.delete(url)
      .then(() => {
        this.form.responses.splice(response_index,1)
      })
      .catch((error) => console.log(error))
    },
    format_date(date){
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
      return new Date(date).toLocaleString('ja-JP',options)
    },
    excel_export(){
      const workbook = XLSX.utils.book_new();
      const ws1 = XLSX.utils.table_to_sheet(document.getElementById('export_table'))
      XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1")
      XLSX.writeFile(workbook, `${this.form.name}_responses.xlsx`)

    },

  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}


th, td {
  padding: 0.25em 0;
}

input[type="text"] {
  width: 100%;
}

#export_table {
  display: none;
}
</style>
