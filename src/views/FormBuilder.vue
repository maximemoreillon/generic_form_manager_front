<template>
  <div class="form_builder">
    <h1>Form builder</h1>
    <template v-if="form">

      <div class="">
        Rename form: <input type="text" v-model="form.name">
      </div>


      <div class="">

      </div>

      <table>
        <tr>
          <th>Label</th>
          <th>Type</th>
          <th>Delete</th>
        </tr>

        <tr
          class="field"
          v-for="(field, i) in form.fields"
          v-bind:key="i">

          <td>
            <input
              type="text"
              v-model="field.label"
              placeholder="Label">
          </td>

          <td>
            <select class="" v-model="field.type">
              <option value="text">Text</option>
              <option value="checkbox">checkbox</option>
            </select>
          </td>

          <td>
            <button
              type="button"
              @click="remove_field(i)">
              Remove field
            </button>
          </td>

        </tr>

        <!-- Add a field button -->
        <tr>
          <td colspan="3">
            <button
              type="button"
              @click="add_field">
              Add field
            </button>
          </td>
        </tr>

      </table>

      <div class="">

      </div>

      <div class="">
        <button type="button" @click="submit()">Update form</button>
      </div>

      <template v-if="form.fields">
        <h2>HTML sample</h2>
        <pre>
          <code>
            {{html_sample}}
          </code>
        </pre>
      </template>




    </template>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'FormBuilder',
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
    add_field(){

      if(!this.form.fields) this.$set(this.form,'fields',[])

      let new_field = {
        label: '',
        type: 'text',
      }
      this.form.fields.push(new_field)
    },
    remove_field(index) {
      if(!confirm('Delete field?')) return
      this.form.fields.splice(index, 1)
    },
    get_form() {
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data
      })
      .catch((error) => console.log(error))
    },
    submit(){
      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}`
      this.axios.put(url,this.form)
      .then(() => {
        this.$router.push({name:'form_dashboard',query:{id:this.$route.query.id}})
      })
      .catch((error) => console.log(error))
    }


  },
  computed: {
    html_sample(){

      let inputs = '\n'
      this.form.fields.forEach((field) => {
        inputs += `
            <label>${field.label}</label>
            <input type="${field.type}" name="${field.label}"><br>`
      });


      return `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <title>${this.form.name}</title>
        </head>
        <body>
          <h1>${this.form.name}</h1>
          <form
            action="${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${this.$route.query.id}/responses"
            method="post">${inputs}

            <input type="submit">
          </form>
        </body>
      </html>`
    }
  }

}
</script>

<style scoped>
pre {
  text-align: left;
  background-color: #444444;
  color: white;
  overflow-y: hidden;
}

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
