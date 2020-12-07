module.exports = {
  siteMetadata: {
    title: 'Gatsby With Apollo',
  },    
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'lolly',
        fieldName: 'Lollies',
        url: 'http://localhost:8888/.netlify/functions/newlolly',
      },
    },
    
  ],
  
};