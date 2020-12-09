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
        url: 'https://virtual-lolly.netlify.app/.netlify/functions/newlolly',
      },
    },
    
  ],
  
};