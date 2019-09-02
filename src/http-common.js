import axios from 'axios';

let baseURL = '';

process.env.NODE_ENV === 'production'
  ? (baseUrl = 'https://api-hackersnewsclone.herokuapp.com/')
  : (baseURL = 'http://localhost:3000/');

export const HTTP = axios.create({
  baseURL,
});
