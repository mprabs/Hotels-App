import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://hotels-api-deploy.herokuapp.com/"
});
