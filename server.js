let Koa =  require('koa');
const Router = require('koa-router');
const router = new Router();
let schema = require('./schema');

const graphqlHTTP = require('koa-graphql');
let { buildSchema } = require('graphql');

 // Construct a schema, using GraphQL schema language
var app = new Koa();

router.all('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');