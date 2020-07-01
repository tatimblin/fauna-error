const faunadb = require('../../node_modules/faunadb');

const q = faunadb.query;
const {
  Call,
} = q;

function userByAccount(client, email) {
  return client.query(Call(q.Function('user_by_account'), email)).then(res => res);
}

function loginUser(client, email, password) {
  const input = {
    email,
    password,
  };
  return client.query(Call(q.Function('auth_account_login'), input)).then(res => flattenDataKeys(res));
}

export {
  userByAccount,
  loginUser,
};
