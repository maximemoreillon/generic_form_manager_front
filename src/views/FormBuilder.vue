<template>
  <div class="form_builder">
    <h1>Form builder</h1>
    <template v-if="form">

      <div class="">
        Form title: <input type="text" v-model="form.name">
      </div>

      <table class="fields_table">
        <tr>
          <th>Label</th>
          <th>Type</th>
          <th>Options</th>
          <th>Delete</th>
        </tr>

        <tr
          class="field"
          v-for="(field, field_index) in form.fields"
          v-bind:key="field_index">

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
              <option value="select">select</option>
            </select>
          </td>

          <td>
            <template v-if="field.type === 'select'">


              <table class="options_table" v-if="field.options.length > 0">
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                  <th>Delete</th>
                </tr>
                <tr
                  v-for="(option, option_index) in field.options"
                  v-bind:key="`field_${field_index}_option${option_index}`">
                  <td>
                    <input type="text" v-model="option.label" placeholder="Option label">
                  </td>
                  <td>
                    <input type="text" v-model="option.value" placeholder="Option value">
                  </td>
                  <td>
                    <button type="button" @click="delete_option(field_index, option_index)">Delete</button>
                  </td>

                </tr>
              </table>

              <button type="button" @click="add_option(field_index)">Add option</button>

            </template>



          </td>

          <td>
            <button
              type="button"
              @click="remove_field(i)">
              Remove field
            </button>
          </td>

        </tr>


      </table>

      <button
        type="button"
        @click="add_field">
        Add field
      </button>


      <div class="">
        <button type="button" @click="submit()">Save</button>
      </div>

      <template v-if="form.fields">
        <h2>HTML code for this form</h2>
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

      let new_field = {
        label: '',
        type: 'text',
        options: [],
      }

      if(!this.form.fields) this.$set(this.form,'fields',[])
      this.form.fields.push(new_field)
    },
    remove_field(index) {
      if(!confirm('Delete field?')) return
      this.form.fields.splice(index, 1)
    },
    add_option(field_index){

      let new_option = {
        label: '',
        value: '',
      }

      if(!this.form.fields[field_index].options) this.$set(this.form.fields[field_index],'options',[])
      this.form.fields[field_index].options.push(new_option)
    },
    delete_option(field_index, option_index) {
      if(!confirm('Delete option?')) return
      this.form.fields[field_index].options.splice(option_index, 1)
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

        if(field.type === 'select') {
          let options = ``

          field.options.forEach((option) => {
            options += `
              <option value="${option.value}">${option.label}</option>`
          });


          inputs += `
            <select form="myForm">
          ${options}

            </select>
          `
        }
        else {
          inputs += `
            <label>${field.label}</label>
            <input type="${field.type}" name="${field.label}"><br>`
        }



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
            id="myForm"
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

.option {
  padding: 0.25em;
}

.option:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

.option > *:not(:last-child) {
  margin-right: 0.25em;
}

.option input[type="text"]:not(:last-child) {
  margin-right: 1em;
}

textarea {
  width: 100%;
  height: auto;
}
</style>
