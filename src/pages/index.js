import React from "react"
import Lolly from "../component/Lolly"
import  Header  from '../component/Header'
import { navigate } from "gatsby"
import CreateNew from './CreateNew'

export default function Home() {
  return( 
 <div className='container'>

   <Header />
     <div className='listlollies'>
   
        <div>
            <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43"  />
        </div>

        <div>
          <Lolly fillLollyTop='black' fillLollyMiddle='white' fillLollyBottom='blue'/>
        </div>

        <div>
          <Lolly fillLollyTop='purple' fillLollyMiddle='red' fillLollyBottom='blue'/>
        </div>
  </div>

    <input type='button' onClick ={ () => { navigate('CreateNew')}} value='Create New Lolly' />

</div>  )
}
