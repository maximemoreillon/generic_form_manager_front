<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">My forms</router-link>
    </nav>
    <main>
      <router-view/>
    </main>

  </div>
</template>

<style>

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;

  text-align: center;
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
  margin: 0 1em;
}


</style>
