<template>
  <div id="app">
    <router-view /><br />
  </div>
</template>

<script>
export default {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
.app-header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
  padding: 20px;
}

#footer {
  padding: 30px;
  bottom: 0;
}
</style>
