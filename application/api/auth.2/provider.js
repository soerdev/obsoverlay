({
  generateToken() {
    const { characters, secret, length } = config.sessions;
    return metarhia.metautil.generateToken(secret, characters, length);
  },

  saveSession(token, data) {
    domain.auth.saveSession(JSON.stringify(data), token);
  },

  startSession(token, data, fields = {}) {
    domain.auth.startSession(token, data);
  },

  async restoreSession(token) {
    return domain.auth.restoreSession(token);
  },

  deleteSession(token) {
    domain.auth.deleteSession(token);
  },

  async registerUser(login, password) {
    domain.auth.registerUser(login, password);
  },

  async getUser(login) {
    return domain.auth.getUser(login);
  },
});
