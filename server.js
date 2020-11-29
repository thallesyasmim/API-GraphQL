// Importações
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        message: String
    } 
`);

// Root Resolver | As mesmas keys do Esquema GraphQL 
const root = {
    message: () => 'Hello World!'
};


// Create an Express Server and a GraphQL endpoint
const app = express();

// Configurando a rota
app.use('/graphql', express_graphql.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})); 


// Quando entrar na porta 3333, o console.log() será disparado
app.listen(3333, () => console.log('*** Express GraphQL Server Now Running On localhost:3333/graphql ***'));
