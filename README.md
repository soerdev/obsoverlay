# OBS Web browser overlay


Send comment via console:
```
api.bus.send({'room': 'obs', 'message': {'comment': 'test'}});
```

Send comment via http:
```
curl -d "{\"room\": \"obs\", \"message\": {\"comment\": \"test2\"}}" -X POST http://localhost:8001/api/bus/send
```

