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

  startSession(token, data) {
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
  },
  async createJWT(email) {
    return npm.jsonwebtoken.sign(
      {
        email,
        'role': 'WORKSHOP',
        'iat': Math.floor(new Date().getTime() / 1000),
        'exp': Math.floor(new Date().getTime() / 1000) + 3600 * 24 * 1000
      }, config.jwt.secret);
  },
  async checkJWT(token) {
    token = (token + '').replace(/[\n\r]*/g, '');
    try {
      const user = await npm.jsonwebtoken.verify(
        token,
        config.jwt.secret
      );
      return user;
    } catch (e) {
      console.log(e);
      throw new Error('No access granted', 403);
    }
  }
});
