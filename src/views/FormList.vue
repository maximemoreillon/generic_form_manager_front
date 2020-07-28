<template>
  <div class="home">

    <h1>My forms</h1>
    <p>Click <router-link :to="{ name: 'create_form'}">here</router-link> to create a new form</p>


    <template v-if="!loading && !error_message">
      <router-link

        class="form"
        :to="{ name: 'form_dashboard', params: {form_id: form._id} }"
        v-for="form in forms"
        v-bind:key="form._id">

        <span class="date">
          {{format_date(form.date)}}
        </span>

        <span class="name">
          {{form.name}}
        </span>

        <span class="responses">
          Responses: {{form.responses.length}}
        </span>

      </router-link>
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

  }
}
</script>

<style scoped>



.form {
  display: flex;
  align-items: center;
  padding: 0.25em;
  border: 1px solid #dddddd;
  color: currentcolor;
  text-decoration: none;
  margin: 0.25em 0;
}

.form > *:not(:last-child) {
  padding-right: 0.5em;
  margin-right: 0.5em;
  border-right: 1px solid #dddddd;
}

.form .name {
  text-align: left;
  flex-grow: 1;
}
.form:hover {
  background-color: #eeeeee;
}

</style>
