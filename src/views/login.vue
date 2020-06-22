<template>
  <div id="login">
    <p :class="message === 'Please try again !' ? 'text-danger' : 0">{{ message }}</p> <br />
    <input v-model="user_email" placeholder="Email" /><br />
    {{ 'eve.holt@reqres.in' }}
    <br /> <br />
    <input type="password" v-model="user_password" placeholder="Password" /> <br />
    {{ 'cityslicka' }}
    <br />
    <br />
    <button class="btn btn-info" @click="login()">Login</button><br /> <br />
    <br>
  </div>
</template>

<script>
// import instance from "./axiosheader.js";
export default {
  name: "login",
  data() {
    return {
      user_email: "",
      user_password: "",
      user_token: "",
      user_registered: false,
      message: "Please fill the details to login"
    };
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
          localStorage.setItem("user_token", this.user_token);
          this.user_registered = true;
          this.$router.replace({ name: "Home" });
        })
        .catch(error => {
          let errorMessage = "Please try again !";
          this.message = errorMessage;
          console.log(error);        
        });
    }
  }
};
</script>
<style scoped>
 .login {
   align-self: center;
   align-content: center;
 }
</style>