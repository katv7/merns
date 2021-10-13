import React,{useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

function App() {

 

  // logic and data
  var [title,settitle] = useState('')

  var [content,setcontent] = useState('')

  var [author, setauthor]= useState('')

  var [arr,setarr] = useState([])

  // for creating side effects of useState. has list of dependencies

  
  function updateTitle(e){
    settitle(e.target.value)
  }

  function updateauthor(e){
    setauthor(e.target.value)
  }

  function updatecontent(e){
    setcontent(e.target.value)
  }

  function submitform(e){

    e.preventDefault()
    
    var data = {
      title:title,
      author:author,
      body:content
    }
    axios({
      url:'/data',
      method:'POST',
      data:data
    }).then( function(){

      console.log('Data sent')

    } ).catch(function(){

      console.log('error')
    })

    settitle('')
    setauthor('')
    setcontent('')
  }
 
  console.log('title:'+title)

  function showdata(){
    axios.get('/api'
      
    ).then(function(response){
      var bdy =response.data
      setarr(bdy)
      console.log('data received')
    }).catch(function(){
      console.log('error')
    })
  }

  useEffect(showdata,[])

  return (
    <div className="App">
      App
     
      <form onSubmit={submitform}>
        <div className='forminput'>
        <input type='text' name='title' value={title} onChange={updateTitle} />
        </div>

        <div className='forminput'>
        <input type='text' name='author' value={author} onChange={updateauthor} />
        </div>
        

        <br/>

        <div className='forminput'>
        <textarea name='body' value={content} onChange={updatecontent} />
        </div>

      
          <button> Submit </button>
          <div>
             {arr.map(function(e,i){
               return(
                 <>
                 <h1> {e.title} </h1>
                 <p> {e.author } </p>
                 <p> {e.body} </p>
                 </>
               )
             }) }
          </div>
        
      </form>
    
    
     


     

    </div>
  );
}




export default App;

