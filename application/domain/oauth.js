({
  strategy: new npm['passport-google-oauth2'].Strategy({
    clientID: config.jwt.googleClientId,
    clientSecret: config.jwt.googleSecret,
    callbackURL: config.jwt.googleCallback,
    scope: ['email', 'profile'],
    passReqToCallback: true,
  }, (request,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    done({ email: profile.email });
  }
  ),
  location() {
    npm.passport.use(domain.oauth.strategy);
    let location = '';
    npm.passport.authenticate('google')(
      { query: {} },
      { setHeader: (name, value) => {
        if (name === 'Location') {
          location = value;
        }
      },
      end: () => {},
      },
      (...args) => { console.log(args); });
    return location;
  },

  async verify(params) {
    const load =
      new Promise((resolve) => {
        npm.passport.use(domain.oauth.strategy);
        npm.passport.authenticate('google',
          { successRedirect: '', failureRedirect: '' })(

          { query: { ...params } },
          { setHeader: (name, value) => {
            if (name === 'Location') {
              location = value;
            }
          },
          end: () => {},
          },
          async (user) => resolve(user));
      });

    return load;
  }
});
