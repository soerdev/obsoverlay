({
  access: 'public',
  method: async (params) => {
    const user = await domain.oauth.verify(params);
    context.client.redirect('/?jwt=' +
    await domain.auth.createJWT(user.email));
    return user;
  }
});


