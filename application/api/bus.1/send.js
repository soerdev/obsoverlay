({
  access: 'public',
  method: async ({ room, message, token }) => {
    const user = await domain.auth.checkJWT(token);
    if (user) {
      domain.bus.send(room, message);
    }
    return 'ok';
  }
});

