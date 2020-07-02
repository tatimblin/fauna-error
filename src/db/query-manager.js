import faunadb from 'faunadb';

import {
  userByAccount,
  loginUser,
} from './queries.js';

/* Initialize the client to contact FaunaDB
 * The client is initially started with the a 'BOOTSTRAP' token.
 * This token has only two permissions, call the 'login' and 'register' User Defined Function (UDF)
 * If the login function succeeds, it will return a new token with elevated permission.
 * The client will then be replaced with a client that uses the secret that was returned by Login.
 */

class QueryManager {
  constructor(token) {
    // A client is just a wrapper, it does not create a persitant connection
    // FaunaDB behaves like an API and will include the token on each request.
    this.bootstrapToken = token || process.env.FAUNADB_TEST_KEY;
    this.client = new faunadb.Client({
      secret: token || this.bootstrapToken,
    });
  }

  login(email, password) {
    return loginUser(this.client, email, password).then((res) => {
      if (res) {
        this.client = new faunadb.Client({ secret: res.secret });
      }
      return res;
    });
  }

  userByAccount(email) {
    return userByAccount(this.client, email).then((res) => {
      if (res) {
        this.client = new faunadb.Client({ secret: res.secret });
      }
      return res;
    });
  }
}

const faunaQueries = new QueryManager();
export { faunaQueries, QueryManager };
