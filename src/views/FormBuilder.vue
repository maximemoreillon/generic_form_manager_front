<template>
  <div class="form_builder">
    <h1>Form builder</h1>
    <template v-if="form">

      <div class="">
        Form ID: {{form._id}}
      </div>

      <h2>Fields</h2>

      <div class="">
        <button type="button" @click="add_field">Add field</button>
      </div>

      <div class="">
        <div
          class="field"
          v-for="(field, i) in form.fields"
          v-bind:key="i">

          <input type="text" v-model="field.label" placeholder="Label">
          <select class="" v-model="field.type">
            <option value="text">Text</option>
            <option value="checkbox">checkbox</option>
          </select>

          <!-- Delete the field -->

          <button type="button" @click="remove_field(i)">Bye</button>
        </div>
      </div>




      <div class="">
        <button type="button" @click="submit()">Update form</button>
      </div>


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
        this.$router.push({name:'form',query:{id:this.$route.query.id}})
      })
      .catch((error) => console.log(error))
    }


  },

}
</script>

<style scoped>

</style>
