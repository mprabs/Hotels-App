<template>
  <div id="app">
    <div id="nav">
      <h3 class="alert alert-primary shadow p-3 mb-5 bg-white rounded" role="alert"> 
      Hotel App
      </h3>
      </div>
    <router-view />
  </div>
</template>

<script>
// import login from "./views/login.vue"

export default {
  // components: {
  //   login
  // }
  data() {
    return {
      hidden: false
    };
  },
  methods: {
    login() {
      this.$router.replace({ name: "login" });
    }
  },
  mounted() {
    this.login();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #adadad;
    }
  }
}
</style>
