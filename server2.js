// Importações
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    } 
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course 
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);


// Lista de Dados
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]


// Funções que serão executadas quando essas querys & mutation foram executadas no GraphIQL

const getCourse = function(args) {
    const id = args.id;
    return coursesData.filter(course => course.id === id)[0];
}

const getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;

        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

const updateCourseTopic = function({id, topic}) {
    const Course = coursesData.map(course => {
        if(course.id === id) {
            course.topic = topic;
            return course;
        }
    })

    return Course[0];
}

// Root Resolve | As mesmas keys do Esquema GraphQL 
const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
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
