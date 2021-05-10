<template>
  <AppTemplate :options="options"/>
</template>

<script>

import AppTemplate from '@moreillon/vue_application_template'

export default {
  name: 'App',
  components: {
    AppTemplate,
  },
  data(){
    return {
      options: {
        authenticate: true,
        title: 'Questionnaire manager',
        login_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/login`,
        identification_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`,
      }
    }
  },
}
</script>


<style>


main a {
  font-weight: bold;
  color: #c00000;
  text-decoration: none;
}

main a:hover {
  text-decoration: underline;
}


button {
  border: none;
  background-color: transparent;
  color: black;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: color 0.25s, border-color 0.25s;
}

button:hover{
  color: #c00000;
}

button:disabled {
  color: #dddddd;
  cursor: not-allowed;
}

button > *:not(:last-child) {
  margin-right: 0.25em;
}

button > .material-design-icon {
  display: flex;
  align-items: center;
}

button.bordered {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.25em 0.5em;
}

button.bordered:hover {
  border-color: #c00000;
}

button.bordered:disabled {
  border-color: #dddddd;
}

.error_message {
  color: #c00000;
}

.centered {
  text-align: center;
}


</style>
