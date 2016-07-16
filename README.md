## WIP cross platform application

Special thanks to https://github.com/DominicTobias/universal-react for a lightweight setup.

## Dev environment setup

```
cd database

docker build -t vincee48/iou-db .

docker run -d --name iou-db -p 5432:5432 --env-file ../.env vincee48/iou-db

npm install

npm start
```

## Production environment

This repository runs the build on a Heroku instance with a PostgresDB addon. Heroku as a production environment does not install devDependencies, requiring all build tools to be installed as a dependency.
