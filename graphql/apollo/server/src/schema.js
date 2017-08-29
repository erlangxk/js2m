import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';

import {
    resolvers
} from './resolvers';


const typeDefs = `

type Channel {
    id:ID!
    name:String
}

type Query {
    channels:[Channel]
}

type Mutation {
    addChannel(name:String!):Channel
}
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});