<template>
  <div class="login">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <p class="header-text">
          Create an account
        </p>
      </div>
      <div class="card-body">
        <b>
          Name
        </b>
        <br />
        <input v-model="user_name" type="name" placeholder="Name" /><br />
        <br />
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
        <button class="btn btn-info" @click="register()">Register</button><br />
        <a @click="goToLogin()">Login</a><br />
      </div>
    </div>
  </div>
</template>

<script>
// import instance from "./axiosheader.js";
export default {
  name: "register",
  data() {
    return {
      user_name: "",
      user_email: "",
      user_password: "",
      user_token: "",
      user_registered: false,
      message: "",
      displayErrorMessage: false
    };
  },

  mounted() {
    // if (localStorage.getItem("user_token")) {
    //   this.$router.replace({ name: "Home" });
    // }
  },

  methods: {
    register() {
      this.$axios
        .post("http://localhost:8081/users/register", {
          name: this.user_name,
          email: this.user_email,
          password: this.user_password
        })
        .then(response => {
          console.log(response);
          this.goToLogin();
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
    },
    goToLogin() {
      this.$router.replace({ name: "login" });
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
