const graphqlHTTP = require('koa-graphql');
let {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = require('graphql');

let educationType = new GraphQLObjectType({
    name: 'education',
    fields: {
        qualification: {type: GraphQLString},
        status: {type: GraphQLString}
    }
})
let education = {
    type: educationType,
    args: {        
    },
    async resolve(parent, args) {
        console.log('education args', args);
        console.log('education parent', parent);
        let education = parent.educationType || {};
        return education;
    }
}
let load = new GraphQLObjectType({
    name: 'load',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        education: education
    }
})
const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        load: {
            type: load,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log('args', args);
                let result = await fakeDBQuery();
                return result;
            }
        },
        loads: {
            type: new GraphQLList(load),
            async resolve(parent) {
                let result = await fakeDBQueryArray();
                return result;
            }
        } 
    }
})

function fakeDBQuery() {
    return new Promise(resolve => {
        console.log(new Date());
        setTimeout((resolve({
            id: 333,
            name: 'Ishan',
            date: new Date().toString(),
            educationType: {
                qualification: 'Grad',
                status: 'Active'
            }
        })))
    })
}
function fakeDBQueryArray() {
    return new Promise(resolve => {
        console.log(new Date());
        setTimeout((resolve(
            [
            {
                id: 3332,
                name: 'Ishan',
                date: new Date().toString(),
                educationType: {
                    qualification: 'Grad',
                    status: 'Active'
                }
            },
            {
                id: 3335,
                name: 'Ishan',
                date: new Date().toString(),
                educationType: {
                    qualification: 'Grad',
                    status: 'Active'
                }
            },
            {
                id: 3334,
                name: 'Ishan',
                date: new Date().toString(),
                educationType: {
                    qualification: 'Grad',
                    status: 'Active'
                }
            }
        ]
    )))
    })
}
module.exports = new GraphQLSchema({
    query: rootQuery
})