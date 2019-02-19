let Koa =  require('koa');
const Router = require('koa-router');
const router = new Router();

const graphqlHTTP = require('koa-graphql');
let { buildSchema } = require('graphql');

 // Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 // The root provides a resolver function for each API endpoint
var root = {
  hello: () => 'Hello world!',
};
var app = new Koa();
router.all('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));
app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');