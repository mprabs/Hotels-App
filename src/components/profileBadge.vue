<template>
  <div class="profile-body">
      <div class="edit">Edit</div>
      <div class="badge">
          <img src="https://picsum.photos/200" alt="">
      </div>
      <hr class="badge-hr" />
      <div class="badge-details">
        <div class="name">{{ user.name }}</div>
        <div class="email">{{ user.email }}</div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user: ""
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user_data'))
        console.log('user',this.user)
    }
}
</script>

<style>
.profile-body {
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.edit {
    display: flex;
    justify-content: flex-end;
}

.profile-body .badge img {
    height: 150px;
    width: 150px;
    border-radius: 75px;
}

.badge-hr {
    border: 1px solid black;
    opacity: 0.2;
    width: 70%;
}

.badge-details .name {
    font-size: 20px;
    font-style: oblique;
}
</style>