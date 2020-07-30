<template>
  <div id="app">
    <main>
      <router-view/>
    </main>

  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;

}

#app {
  display: flex;
  justify-content: center;
}
main {
  flex-grow: 1;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  max-width: 800px;
}

a {
  color: #c00000;
  text-decoration: none;
}

a:hover {
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
