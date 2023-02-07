// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios  from "axios";


//  const UploadImage = ({name}) => {
//      const [img,setImg] = useState()
//      const upload = async(name) => {
//        try{
//      const res = await axios.put(`http://localhost:8000/image/${name}`) 
//         setImg(res);
//        console.log(res);
//       } catch (err){
//       console.log(err);
//        }
        
//    }
//    useEffect(()=>{
//        upload();
//    })
//     return (
//         <>
//            <nav aria-label="breadcrumb">
//                 <ol class="breadcrumb">
//                 <li class="breadcrumb-item"><a href="/">Albums</a></li>
//                 <li class="breadcrumb-item active" aria-current="page">Upload Image</li>
//                 </ol>
//             </nav> 
           
             

//         </>
//     )
// }

// export default UploadImage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateImage = (props) => {
  //const [name, setName] = useState('');
  const [imageurl, setImageUrl] = useState([]);
  const [error, setError] = useState(null);

  const handleImageUrl =  (e) => {
    setImageUrl(e.target.value);
  }




  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/image/${props.match.params.name}`,{images:imageurl});
      console.log(response.data);
      window.alert("updated")
    } catch (error) {
      setError(error);
    }
  };
 
  

  return (
    
      <>
      <div>
        {/* <input type="text" value={name}  onChange={(e) => setName(e.target.value)} /> */}
      <input type="text" name="images" placeholder='copy and paste the link of image' onChange={handleImageUrl}  />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      {error && <p>An error occurred: {error.message}</p>}
      </div>
      </>
    
  );
};

export default UpdateImage;
