const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb')
const q = faunadb.query;
const shortid = require('shortid')


const typeDefs = gql`
  type Query {
    hello: String
    getAllLollies: [Lolly]!
    getLollyBySlug(slug : String!) : Lolly
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
      console.log(' -------------- Hello -----------------------  ');
         return 'Hello, Lollypop!'
    }, 
    
    getAllLollies : async(root, args, context) => {

      console.log('getAllLollies  ');
      
         const client = new faunadb.Client({'secret' : 'fnAD61-NQjACA2hs1xp7B-hcs9l52c1rPJaV104i'});
         console.log('------- Connected ----------------- ')
      

        console.log('Connected  ');
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lollyPath"))),
            q.Lambda(x => q.Get(x))
          )
        )

        // console.log('result ---- ', result);
        // console.log('result.data ---- ', result.data);

        return result.data.map(d => { 
          // console.log('----------dd-----------', d)
        return {    
          recipientName : d.data.recipientName,
          message : d.data.message,
          senderName : d.data.senderName,
          flavourTop : d.data.flavourTop,
          flavourMiddle : d.data.flavourMiddle,
          flavourBottom : d.data.flavourBottom,
          lollyPath : d.data.lollyPath,
                }
        });    
    },

    getLollyBySlug : async(_, {slug}) => {
      console.log('========getLollyBySlug ========',  {slug})
      console.log('========getLollyBySlug ========',  slug)
      try {
        var client;
        try {
         client = new faunadb.Client({'secret' : 'fnAD61-NQjACA2hs1xp7B-hcs9l52c1rPJaV104i'});
         console.log('========  getLollyBySlug -Connected ========== ');
        } catch(error) {
          console.log('client... error ===== ',  error)
        }
        
         const result = await client.query(
          q.Get(q.Match(q.Index("lolliesPath1")))
      );
        
      return result.data;

         } catch(error) {
           console.log('getLollyBySlug ======  error ', error)
           console.log('getLollyBySlug ........  error ', error.toString)
         }
    }
  },

  Mutation :  {

    createLolly : async(_, args) => {
        console.log('======== create Lolly function ======== ', args);

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
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
