import React, {useState, useRef} from 'react'
import  Header  from '../component/Header'
import Lolly from "../component/Lolly"
import { gql, useQuery, useMutation} from '@apollo/client'

const Get_Lolly = gql `{
    hello
}`

const createLollyMutation = gql`
    mutation createLolly($recipientName : String!, $message : String!, $senderName : String!, $flavourTop : String!, $flavourMiddle : String!, $flavourBottom : String! ) {

      createLolly(recipientName: $recipientName, message : $message, senderName : $senderName, flavourTop : $flavourTop, flavourMiddle : $flavourMiddle, flavourBottom : $flavourBottom) {
          message
          lollyPath
      }
}`


export default function CreateNew() {
    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")

    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();

    const {loading, error, data} = useQuery(Get_Lolly);
    const [createLolly] = useMutation(createLollyMutation);
    


    const submitLollyForm = async() => {
        console.log('form');
        console.log('color 1  ', color1)
        console.log('senderRef  ', senderRef.current.value);

        const result = await createLolly( 
            {  
            variables : {
                recipientName: recipientNameRef.current.value, 
                message : messageRef.current.value,
                senderName : senderRef.current.value,
                flavourTop : color1, 
                flavourMiddle : color2,
                flavourBottom : color3
            }
        }
        );

        console.log('result ', result)
    }

    return (
    
    <div className='container'>

        {console.log('data...  ' ,  {data})}
    <Header />
        <div className = 'lollyformDiv'> 
            <div>
                 <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3}  />
            </div>
           
            <div className='lollyflavorDiv'>
                <label htmlFor='flavorTop' className='colorPickerLabel' >
                    <input type='color' className='colorPicker' value={color1} name='flavorTop' id='flavorTop'
                    onChange = {(e) => setColor1(e.target.value)}/>
                </label>
                <label htmlFor='flavorTop' className='colorPickerLabel' >
                     <input type='color' className='colorPicker' value={color2} name='flavorTop' id='flavorTop'
                     onChange = {(e) => setColor2(e.target.value)}/>
                </label>                  
                <label htmlFor='flavorTop' className='colorPickerLabel' >
                    <input type='color' className='colorPicker' value={color3} name='flavorTop' id='flavorTop'
                    onChange = {(e) => setColor3(e.target.value)}/>
                </label>
            </div>

            <div className='lollyForm'>
                <label htmlFor='recipientName' >
                    To
                </label>
                <input type='text' name='recipientName' id='recipientName' ref={recipientNameRef}/>   

                <label htmlFor='recipientMessage' >
                    Message
                </label>
                <textarea rows='15' colums='30' name='recipientMessage' id='recipientMessage' ref={messageRef}/>   

                <label htmlFor='from' >
                    From
                </label>
                <input type='text' name='from' id='from'  ref={senderRef}/>  
                <input type='button' onClick={submitLollyForm}  value='Create' />            
            </div>
        </div>

    </div>)
}