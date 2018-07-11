<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body{
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #0aa89e;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f4f8fb;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #f4f8fb;
  box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  -moz-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
}
</style>
