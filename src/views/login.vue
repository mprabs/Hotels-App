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
        <div v-if="loading">
          <loader />
        </div>
        <b v-if="displayErrorMessage" class="text-danger">{{ message }}</b>
        <br />
      </div>
      <div class="card-footer">
        <button class="btn btn-info" @click="login()">Login</button><br />
        <div class="register">
          New here?<a style="cursor: pointer;" @click="showRegister()">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import instance from "./axiosheader.js";
import loader from "../components/loader";
import { LOCAL_URL, WEB_URL } from '../../config'
export default {
  name: "login",
  data() {
    return {
      user_email: "",
      user_password: "",
      user_token: "",
      user_registered: false,
      message: "",
      displayErrorMessage: false,
      loading: false
    };
  },
  components: {
    loader
  },
  mounted() {
    if (localStorage.getItem("user_token")) {
      this.$router.replace({ name: "Home" });
    }
  },

  methods: {
    showRegister() {
      this.$router.replace({ name: "register" });
    },
    login() {
      this.loading = true;
      console.log("login")
      this.$axios
        .post(`${LOCAL_URL || WEB_URL}/users/login`, {
          email: this.user_email,
          password: this.user_password
        })
        .then(response => {
          this.loading = false;
          this.displayErrorMessage = false;
          this.user_token = response.data.token;
          localStorage.setItem(
            "user_token",
            JSON.stringify({
              token: this.user_token
            })
          );
          localStorage.setItem("user_data", JSON.stringify(response.data.user));
          console.log(response.data.user)
          this.$axios.defaults.headers.common["auth_token"] = this.user_token;
          this.user_registered = true;
          this.$router.replace({ name: "Home" });
        })
        .catch(error => {
          this.displayErrorMessage = true;
          this.loading = false;
          // setTimeout(() => {
          //   this.displayErrorMessage = false;
          // }, 2000);
          console.log(error)
          this.message = error.message;
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

.card-footer .register a{
  margin: 5px;
}


</style>
