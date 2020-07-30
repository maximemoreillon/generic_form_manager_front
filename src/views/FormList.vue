<template>
  <div class="home">

    <h1>My forms</h1>
    <p>
      <router-link :to="{ name: 'create_form'}">Create a new form</router-link>
    </p>


    <template v-if="!loading && !error_message">
      <table class="forms_table">
        <tr>
          <th>Date</th>
          <th>Tite</th>
          <th>Responses</th>
        </tr>

        <tr
          v-for="form in forms"
          v-bind:key="form._id"
          @click="view_form(form._id)">

          <td class="date">
            {{format_date(form.date)}}
          </td>

          <td class="name">
            {{form.name}}
          </td>

          <td class="responses">
            {{form.responses.length}}
          </td>

        </tr>

      </table>

    </template>


    <div class="">
      <Loader v-if="loading">Loading...</Loader>
    </div>

    <div class="" v-if="!loading">
      {{error_message}}
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import Loader from '@moreillon/vue_loader'

export default {
  name: 'FormList',
  components: {
    Loader,
  },
  data(){
    return {
      forms: [],

      loading: false,
      error_message: null,

    }
  },
  mounted(){
    this.get_forms_of_user()
  },
  methods: {
    get_forms_of_user() {
      this.loading = true
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms`
      this.axios.get(url)
      .then((response) => {
        this.forms = []
        response.data.forEach((form) => {
          this.forms.push(form)
        })
      })
      .catch((error) => {
        this.error_message = error
      })
      .finally(() => {
        this.loading = false

      })
    },
    format_date(date){
      let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
      return new Date(date).toLocaleString('ja-JP',options)
    },
    view_form(form_id){
      this.$router.push({name: 'form_dashboard', params: {form_id: form_id}})
    }

  }
}
</script>

<style scoped>


table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

tr:not(:first-child) {
  cursor: pointer;
  transition: background-color 0.25s;
}
tr:not(:first-child):hover {
  background-color: #dddddd;
}

tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

th, td {
  padding: 0.25em 0;
}

</style>
