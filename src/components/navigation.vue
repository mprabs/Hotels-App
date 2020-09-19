<template>
  <div class="nav">
      <div class="logo">
          <h3>Hotels App</h3>
      </div>
      <ul class="nav-items">
          <li class="profile-button">
              <a @click="$emit('profile')"> 
                  <i :class="showProfile? 'fas fa-times' : 'fas fa-user-circle'"></i>
              </a>
          </li>
          <li class="logout-button">
              <a @click="logout()"><i class="fas fa-power-off"></i></a>
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
    },
    props: {
        showProfile: {
            type: String
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
    padding: 0 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
}

.nav .logo {
    padding-left: 20px;
}

.nav-items {
    flex: 0.1;
    display: flex;
    list-style: none;
    justify-content: space-around;
    margin: 0;
}

.nav-items li {
    cursor: pointer;
    font-size: 20px;
}

.nav-items li:hover {
    color: yellow;
}

.logout-button {
    color: rgb(241, 158, 158);
}

.profile-button {
    color: rgb(183, 183, 235);
}


@media screen and (max-width:900px){
    .nav-items {
        flex: 0.7;
        justify-content: space-around;
    }
}

</style>