const graphqlHTTP = require('koa-graphql');
let { GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLID } = require('graphql');


let load = new GraphQLObjectType({
    name:'load',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        date: {type: GraphQLString}
    }
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        loads: {
            type: load,
            args: {id: { type: GraphQLString }},
            async resolve(parent, args) {
                console.log('args',args);
                let result = await fakeDBQuery();
                return result;
            }
        }
    }
})

function fakeDBQuery() {
    return new Promise(resolve => {
        console.log(new Date());
        setTimeout(( resolve({id: 333,name:'Ishan', date: new Date().toString()})))
    })
}
module.exports = new GraphQLSchema({
    query: rootQuery
})