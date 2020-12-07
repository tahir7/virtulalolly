// const path = require("path");

// exports.createPages = async ({ actions, graphql }) => {
//   const { data } = await graphql(`
//     query MyQuery {
//       Lollies {
//         getAllLollies {
//             lollyPath
//         }
//       }
//     }
//   `);

//   data.Lollies.getAllLollies.forEach(({ lollyPath }) => {
//     actions.createPage({
//       path: `lollies/${lollyPath}`,
//       component: path.resolve(`./src/template/dynamiclollytemplate.jsx`),
//       context: {
//         slug: lollyPath,
//       },
//     });
//   });
// };

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   // page.matchPath is a special key that’s used for matching pages

//   // only on the client.

//   if (page.path.match(/^\/lollies/)) {
//     page.matchPath = "/lollies/*";

//     // Update the page.

//     createPage(page);
//   }
// };



// ================================================================

const path= require(`path`)

exports.createPages = async({actions, graphql}) => {

    const result = await graphql(`
                    query MyQuery {
                        Lollies {
                            getAllLollies {
                                recipientName
                                message
                                senderName 
                                flavourTop
                                flavourMiddle 
                                flavourBottom 
                                lollyPath                                     
                            }                  
                        }
                    }
                `);

//   console.log('gatsby-node.js ---------  ' ,  data.Lollies.getAllLollies);
//   console.log('gatsby-node.js ---------  ' ,  data.MyQuery);

  
   result.data.Lollies.getAllLollies.map(async(lollydata) => {
        console.log('--------lollydata----  ', lollydata)
        
        await actions.createPage({
            path : `/lollies/${lollydata.lollyPath}`,
            component : path.resolve(`./src/template/dynamiclollytemplate.jsx`),
            context : {
                data : lollydata,
                slug : lollydata.lollyPath
            },

        })
   })

}

