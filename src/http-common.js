import axios from 'axios';

let baseUrl = '';

process.env.NODE_ENV === 'production'
  ? (baseUrl = 'https://api-hackersnewsclone.herokuapp.com/')
  : (baseUrl = 'http://localhost:3000/');

export const HTTP = axios.create({
  baseUrl,
});
