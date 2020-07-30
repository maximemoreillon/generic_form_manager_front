<template>
  <div class="form_builder">
    <h1>Form builder</h1>
    <template v-if="form">


      <h2>Form metadata</h2>

      <div class="title_wrapper">
        <label for="">Form title:</label>
        <input type="text" v-model="form.name">
      </div>

      <h2>Form fields</h2>

      <div
        class="table_wrapper"
        v-if="form.fields">



        <table
          class="fields_table"
          v-if="form.fields.length > 0">
          <tr>
            <th>ラベル / Label</th>
            <th>タイプ / Type</th>
            <th>選択し / Options</th>
            <th>削除 / Delete</th>
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


                <table
                  v-if="field.options.length > 0"
                  class="options_table" >
                  <tr>
                    <th>ラベル / Label</th>
                    <th>値 / Value</th>
                    <th>削除 / Delete</th>
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
                      <button
                        type="button"
                        @click="delete_option(field_index, option_index)">
                        <delete-icon />
                      </button>
                    </td>

                  </tr>
                </table>

                <div class="" v-else>
                  No options yet
                </div>

                <div class="centered">
                  <button
                    class=""
                    type="button"
                    @click="add_option(field_index)">
                    <plus-icon />
                    <span>追加 / Add option</span>
                  </button>
                </div>



              </template>

            </td>

            <td>
              <button
                type="button"
                @click="delete_field(field_index)">
                <delete-icon />
              </button>
            </td>

          </tr>

          <tr>
            <td colspan="4">
              <button
                type="button"
                class="bordered"
                @click="add_field()">
                <plus-icon />
                <span>Add field</span>
              </button>
            </td>
          </tr>


        </table>

      </div>

      <div class="" v-else>
        No fields yet
      </div>

      <p class="centered">
        <button
          type="button"
          class="bordered"
          @click="return_to_dashboard()">
          <arrow-left-icon />
          <span>Return</span>
        </button>

        <button
          type="button"
          class="bordered"
          @click="submit()">
          <content-save-icon />
          <span>Save</span>
        </button>
      </p>



      <template v-if="form.fields">
        <h2>HTML code for this form</h2>
        <div class="centered">
          <button
            class="bordered"
            type="button">
            <download-icon />
            <span>Download</span>
          </button>
        </div>
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
    delete_field(index) {
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
      let form_id = this.$route.params.form_id
        || this.$route.params.id
        || this.$route.query.form_id
        || this.$route.query.id

      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${form_id}`
      this.axios.get(url)
      .then((response) => {
        this.form = response.data
      })
      .catch((error) => console.log(error))
    },
    submit(){

      let form_id = this.$route.params.form_id
        || this.$route.params.id
        || this.$route.query.form_id
        || this.$route.query.id

      let url = `${process.env.VUE_APP_GENERIC_FORM_MANAGER_API_URL}/forms/${form_id}`
      this.axios.put(url,this.form)
      .then(() => { this.return_to_dashboard() })
      .catch((error) => console.log(error))
    },
    return_to_dashboard(){
      let form_id = this.$route.params.form_id
        || this.$route.params.id
        || this.$route.query.form_id
        || this.$route.query.id

      this.$router.push({
        name:'form_dashboard',
        params:{ form_id: form_id }
      })
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
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

tr:not(:last-child):not(:first-child):hover {
  background-color: #eeeeee;
}

td {
  padding: 0.5em;
}

table select,
table input {
  width: 100%;
}

.centered > *:not(:last-child){
  margin-right: 0.5em;
}


</style>
