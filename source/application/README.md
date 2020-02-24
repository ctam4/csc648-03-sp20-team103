# Local Testing

```sh
#cwd csc648-03-sp20-team103/source/application
sudo docker-compose up --build        # build and start docker-compose
```

If docker-compose fails to connect to the Docker daemon, ensure the Docker daemon is up (`sudo dockerd`).

- HTTP: `http://localhost:9080/`
- HTTPS: `https://localhost:9443/`
