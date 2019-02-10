var express = require('express');
var expressGraphQL = require('express-graphql');
var {
    buildSchema
} = require('graphql');

var schema = buildSchema(`
    type Query {
        getUsers: [User]
        getUser(id: Int!): User
    }

    type Mutation {
        addUser(id: Int!, name: String!): User
        updateUser(id: Int!, name: String!): User
        deleteUser(id: Int!): [User]
    }

    type User {
        id: Int
        name: String
    }
`);

var users = [{
        id: 1,
        name: "Gon"
    },
    {
        id: 2,
        name: "Killua"
    }
]

var root = {
    getUsers: () => {
        return users;
    },
    getUser: (args) => {
        var id = args.id;
        var list = users.filter(user => {
            return user.id == id;
        });


        if (list.length > 0) {
            return list[0]
        }
        return {
            id: -1,
            name: ""
        };
    },
    addUser: (args) => {
        var id = args.id;
        var name = args.name;

        users.push({
            id: id,
            name: name,
        })

        return {
            id: id,
            name: name
        };
    },
    updateUser: (args) => {
        var id = args.id;
        var name = args.name;

        users.map(user => {
            if (user.id == id) {
                user.name = name;
                return user;
            }
            return
        })

        return root.getUser({
            id: id
        });
    },
    deleteUser: (args) => {
        var id = args.id;
        users = users.filter(user => {
            return user.id != id;
        })
        return users;
    }
}

var app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, function () {
    console.log("Listening on Port 3000...");
})