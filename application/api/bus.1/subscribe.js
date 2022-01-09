({
  access: 'public',
  method: async ({ room }) => {
    const clients = domain.bus.getRoom(room);
    clients.add(context.client);
    context.client.on('close', () => {
      clients.delete(context.client);
    });
    return 'ok';
  },
});
