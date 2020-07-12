<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <p class="header-text">
          Please fill the details to login
        </p>
      </div>
      <div class="card-body">
        <b>
          Email
        </b>
        <br />
        <input v-model="user_email" type="email" placeholder="Email" /><br />
        <br />
        <b>
          Password
        </b>
        <br />
        <input type="password" v-model="user_password" placeholder="Password" />
        <br />
        <br />
        <b v-if="displayErrorMessage" class="text-danger">{{ message }}</b>
        <br />
      </div>
      <div class="card-footer">
        <button class="btn btn-info" @click="login()">Login</button><br />
      </div>
    </div>
  </div>
</template>

<script>
// import instance from "./axiosheader.js";
export default {
  name: "login",
  data() {
    return {
      user_email: "eve.holt@reqres.in",
      user_password: "cityslicka",
      user_token: "",
      user_registered: false,
      message: "",
      displayErrorMessage: false
    };
  },

  mounted() {
    if (localStorage.getItem("user_token")) {
      this.$router.replace({ name: "Home" });
    }
  },

  methods: {
    login() {
      this.$axios
        .post("https://reqres.in/api/login", {
          email: this.user_email,
          password: this.user_password
        })
        .then(response => {
          this.user_token = response.data.token;
          localStorage.setItem("user_token", JSON.stringify(this.user_token));
          this.user_registered = true;
          this.$router.replace({ name: "Home" });
        })
        .catch(error => {
          this.displayErrorMessage = true;
          setTimeout(() => {
            this.displayErrorMessage = false;
          }, 2000);
          let e = JSON.stringify(error);
          if (e.includes("400")) {
            this.message = "Incorrect Username or Password. Try Again !";
          } else {
            this.message = "No Internet Connection !";
          }
        });
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  margin: 0 auto;
}
.card {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}
.header-text {
  font-size: 1.2em;
}
.card-header {
  height: 50px;
}
</style>
