'use strict'

import { faunaQueries } from './db/query-manager.js';

const triggerUserByAccount = document.getElementById('user-by-account');
const triggerLogin = document.getElementById('login');


triggerUserByAccount.addEventListener('click', () => {
  console.log('userByAccount() initiated');
  faunaQueries
    .userByAccount('tatimblin@gmail.com')
    .then(res => console.log(res))
    .catch(err => console.log(err))
});

triggerLogin.addEventListener('click', () => {
  console.log(process.env.VUE_APP_FAUNADB_TEST_KEY);
  console.log('login() initiated');
  faunaQueries
    .userByAccount('tatimblin@gmail.com', 'Lupineden01$')
    .then(res => console.log(res))
    .catch(err => console.log(err))
});
