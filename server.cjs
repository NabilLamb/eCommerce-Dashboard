// import { create, defaults, router } from 'json-server';

const { create, defaults, router } = require('./node_modules/json-server');

const server = create();
const routerInstance = router('public/world-110m.json');
const middlewares = defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(routerInstance);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
