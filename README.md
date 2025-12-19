
RUN:
1 mongod
2 backend/task-service -> npm i && npm start
3 backend/api-gateway -> npm i && npm start
4 frontend -> npm i && npm run dev
