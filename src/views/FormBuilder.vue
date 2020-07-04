<template>
  <div class="form_builder">

    <button type="button" @click="add_field">Add field</button>

    <div
      class="field"
      v-for="(field, i) in fields"
      v-bind:key="i">

      <input type="text" v-model="field.label" placeholder="Label">
      <select class="" v-model="field.type">
        <option value="text">Text</option>
        <option value="checkbox">checkbox</option>
      </select>

      <!-- Delete the field -->
      <button type="button" @click="remove_field(i)">Bye</button>
    </div>

    <button type="button" @click="submit()">Update form</button>











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
      fields: []
    }
  },
  mounted(){
  },
  methods: {
    add_field(){
      let new_field = {
        label: '',
        type: 'text',
      }
      this.fields.push(new_field)
    },
    remove_field(index) {
      this.fields.splice(index, 1)
    },
    submit(){
      alert('not implemented')
    }


  },

}
</script>

<style scoped>
.responses_table {
  border-collapse: collapse;
  width: 100%;
}
.responses_table tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}
.responses_table tr:first-child {
  border-bottom: 1px solid black;
}
.responses_table th, .responses_table td {
  padding: 0.25em;
}
</style>
