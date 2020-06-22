export const instance = this.$axios.create({
  headers: { Authorization: localStorage.getItem('user_token') }
})