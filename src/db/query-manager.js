import faunadb from 'faunadb';

import {
  userByAccount,
  loginUser,
} from './queries.js';

class QueryManager {
  constructor(token) {
    // dotenv currently isn't accessible outside webpack config for
    // some reason. I gave up trying to figure thos out because you
    // can just put the api key in the next line. :(
    this.bootstrapToken = token || process.env.FAUNADB_TEST_KEY; // <-- add key here
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
