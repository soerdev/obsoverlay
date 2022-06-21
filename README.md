# OBS Web browser overlay

Send comment via console:

```
api.bus.send({'room': 'obs', 'message': {'comment': 'test'}});
```

Send comment via http:


```
 curl -X POST -H "Content-Type: application/json" \
      -d '{"room": "obs", "message": {"comment": "This is small test"}, "token": "'$token'"}' \
      https://overlay.s0er.ru/api/bus/send
```
