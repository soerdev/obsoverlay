({
  rooms: new Map(),

  getRoom(name) {
    let room = domain.bus.rooms.get(name);
    if (room) return room;
    room = new Set();
    domain.bus.rooms.set(name, room);
    return room;
  },

  send(name, message) {
    const room = domain.bus.getRoom(name);

    const escapedMessage = {};
    Object.keys(message).forEach((key) => {
      escapedMessage[key] = npm['escape-html'](message[key] + '')
        .split('&amp;').join('&'); // prevent double escaped & (amp)
    });

    for (const client of room) {

      client.emit('bus/message', { room: name, message: escapedMessage });
    }
  },
});
