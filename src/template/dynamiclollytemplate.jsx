import React from "react"
import Lolly from "../component/Lolly"
import  Header  from '../component/Header'


export const query = graphql `
    query MyQuery($slug : String!) {
        Lollies {
            
            getLollyBySlug(slug : $slug) {
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
`

const isBrowser = () => typeof window !== "undefined";


const dynamiclollyTemplate = ({

    
    // console.log('lollydata ........  ' , lollydata);
    // const {location, pageContext } = lollydata;

    data: {
        Lollies: { getLollyBySlug },
      },

}) => {
    console.log(getLollyBySlug);
    // console.log(data);

    return (
        <div > 
        <Header/>
            
            <div className='giftlollyDiv'>                   
               
                <div>
                    <Lolly fillLollyTop={getLollyBySlug.flavourTop} fillLollyMiddle={getLollyBySlug.flavourMiddle}
                    fillLollyBottom={getLollyBySlug.flavourBottom}  />
                </div>

                <div className='messageDiv'>
                    <span className='sharelolly'>
                        Your lolly is freezing. Share it with this link: <br/>
                        {/* <p> {window.location.origin}/lollies/{getLollyBySlug.lollyPath} </p>  */}
                    </span>
                    <div className='giftlollyContent'>
                        <h2> {getLollyBySlug.recipientName}</h2>
                        <h2> {getLollyBySlug.message}</h2>
                        <h2> {getLollyBySlug.senderName}</h2>
                    </div>

                </div>


            </div>

            <div className='sentFooter'>
               
                {getLollyBySlug.senderName} made this virtual lollipop for you. You can make your own to send to a friend who 
                <br/> deserve some sugary treat which won't rot their teeth...
                 {/* <a href= {window.location.origin +'/CreateNew'}> Create Virtual Lolly for me</a> <br/>
                 <a href= {window.location.origin}> Home </a>  */}

                {/* <a href= {`{${isBrowser() ? location.origin : ""}` +'/CreateNew'}> Create Virtual Lolly for me</a> <br/>
                 <a href= {`{${isBrowser() ? location.origin : ""}`}> Home </a>  */}
            </div>

        

        </div>
          )

}

export default dynamiclollyTemplate;