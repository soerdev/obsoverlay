({
  user:  { login: 'obs', hash: 'test' },
  session: {},

  getUser(login) {
    console.log(domain.auth.user, login);
    if (domain.auth.user.login === login) {
      console.log(domain.auth.user);
      return domain.auth.user;
    }
    return null;
  },

  saveSession(data, token) {
    domain.auth.session[token] = data;
  },

  startSession(token, data, fields = {}) {
    domain.auth.session[token] = data;
  },

  async restoreSession(token) {
    return domain.auth.session[token];
  },

  deleteSession(token) {
    domain.auth.session[token] = undefined;
  },

  async registerUser(login, hash) {
    domain.auth.user = { login, hash };
  }


});
