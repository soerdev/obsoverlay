({
  access: 'public',
  method: async ({ room, message }) => {
    domain.bus.send(room, message);
    return 'ok';
  }
});

