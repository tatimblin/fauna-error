'use strict'

import { faunaQueries } from './db/query-manager.js';

const triggerUserByAccount = document.getElementById('user-by-account');
const triggerLogin = document.getElementById('login');


triggerUserByAccount.addEventListener('click', () => {
  console.log('userByAccount() initiated');
  faunaQueries
    .userByAccount('tess@email.com')
    .then(res => console.log(res))
    .catch(err => console.log(err))
});

triggerLogin.addEventListener('click', () => {
  console.log('login() initiated');
  faunaQueries
    .userByAccount('tess@email.com', 'TestTest')
    .then(res => console.log(res))
    .catch(err => console.log(err))
});
