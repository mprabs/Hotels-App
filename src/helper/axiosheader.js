import axios from 'axios';

export const instance = axios.create({
  headers: { auth_token: localStorage.getItem("user_token") }
});
