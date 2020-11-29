const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb')
const q = faunadb.query;
const shortid = require('shortid')


const typeDefs = gql`
  type Query {
    hello: String
    }
  type Lolly {
    recipientName : String!
    message : String!
    senderName : String!
    flavourTop : String!
    flavourMiddle : String!
    flavourBottom : String!
    lollyPath : String!
  }

  type Mutation {
    createLolly(
      recipientName : String!, message : String!, senderName : String!, flavourTop : String!, flavourMiddle : String!, flavourBottom : String!
    ) : Lolly
  }`


const resolvers = {
  Query: {
    hello: (root, args, context) => {

         return 'Hello, Lollypop!'
    },    
  },

  Mutation :  {

    createLolly : async(_, args) => {
        console.log('create Lolly function  ');

        console.log(args);

        const client = new faunadb.Client({'secret' : 'fnAD61-NQjACA2hs1xp7B-hcs9l52c1rPJaV104i'});
        const id = shortid.generate();
        args.lollyPath = id;

        const result = await client.query(
          q.Create(
            q.Collection('lollies'), 
            {
              data: args
            }
          )
        );
  
        console.log('result   ', result);
        console.log('result.data   ', result.data)
        return result.data;

        // return {
        //   message : 'hello'
        // }

    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
