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
    for (const client of room) {
      client.emit('bus/message', { room: name, message });
    }
  },
});
