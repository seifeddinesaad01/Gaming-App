import React from 'react';
import VideoInput from '../../VideoInput/VideoInput';
import ImageInput from '../../ImageInput/ImageInput';
import { useState } from 'react';
import axios from 'axios';

function Videos() {
  
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    try {
      const response = await axios.post('http://localhost:5000/user', formData)
      if (response) {
      setStatus(response.statusText);
      console.log("succes d'envoi");
      }
    } catch (error) {
      console.error(error)
      console.log("echec d'envoi")
    }
  }
  
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  
  }
  return (
     //image with input file
// <div className='App'>
//       <h1>Upload to server</h1>
//       {image.preview && <img src={image.preview} width='100' height='100' />}
//       <hr></hr>
//       <form onSubmit={handleSubmit}>
//         <input type='file' name='file' onChange={handleFileChange}></input>
//         <button type='submit'>Submit</button>
//       </form>
//       status && <h4>{status}</h4>
//     </div>
     
    <div>
    <h1 style={{color:"#222222"}}>videos page</h1>
    <VideoInput width={400} height={300} />
    <br/>
    <br/>
     <ImageInput/>
    
    </div>

  );
}

export default Videos;

//getimage

// useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/data')
  //       setStatus(response.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

