<template>
  <div class="nav">
      <div class="logo">
          <h3>Hotels App</h3>
      </div>
      <ul class="nav-items">
          <li class="profile-button">
              <a @click="$emit('profile')">Profile</a>
          </li>
          <li class="logout-button">
              <a @click="logout()">Logout</a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$router.replace({ name: "login" });
            localStorage.clear();
        }
    }
}
</script>

<style>
.nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(52, 52, 59);
    color: rgb(182, 182, 182);
    height: 10vh;
    padding: 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
}

.nav .logo {
    padding-left: 20px;
}

.nav-items {
    flex: 0.3;
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    margin: 0;
}

.nav-items li {
    cursor: pointer;
}

.logout-button {
    color: brown;
}

.logout-button:hover {
  color: rgb(205, 81, 50);
}

@media screen and (max-width:900px){
    .nav-items {
        flex: 0.7;
        justify-content: space-around;
    }
}

</style>