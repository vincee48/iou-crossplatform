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
