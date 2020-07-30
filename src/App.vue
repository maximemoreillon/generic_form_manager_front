<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
    </nav>
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

nav {
  padding: 1em;
  border-bottom: 1px solid #dddddd;
}

nav a {
  font-weight: bold;
  color: #444444;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #c00000;
}

main {

  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
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
