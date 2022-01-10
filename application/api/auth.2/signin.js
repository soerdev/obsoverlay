({
  access: 'public',
  method: async ({ token }) => {
    try {
      const user = await npm.jsonwebtoken.verify(
        token,
        config.jwt.secret
      );
      console.log(`Logged user ${user}`);
      const data = { user };
      context.client.startSession(token, data);
      const { ip } = context.client;
      api.auth.provider.startSession(token, data, { ip });
      return { status: 'logged', token, user };
    } catch (e) {
      throw new Error('No access granted', 403);
    }
  },
});
