import React, { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import Albumlist from "./Albumlist";


const Addalbum = () => {
    
    // const [Data, setData] = useState({
    //     name: "", description: ""
    // });

    // let name, value;
    // const handleInputs = (e) => {
    //     name = e.target.name;
    //     value = e.target.value;

    //     setData({ ...Data, [name]: value })
    // }

    //     // try {
    //     //     const response = await fetch('http://localhost:8000/upload', {
    //     //       method: 'POST',
    //     //       headers: {
    //     //         'Content-Type': 'application/json'
    //     //       },
    //     //       body: JSON.stringify({
    //     //         name,description
    //     //       })
    //     //     });
    //     //     const data = await response.json();
    //     //     console.log(data);
    //     //   } catch (error) {
    //     //     console.error(error);
    //     //   }

    // }
    const [info ,setInfo] = useState({
        name:"",description:""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setInfo({...info,[name]:value})
    }
    const postData = async(e) => {
        e.preventDefault();
        const {name,description} = info;
        try{
            const res = await axios.post('/upload',{name,description})
            console.log(res); 
            window.alert("uploaded") 
        } catch (err) {
            console.log(err)
            window.alert("not uploaded")
        }
    }

    const [get,setGet] = useState(['']);
    const getData = async() => {
       
        try{
        const res = await axios.get('/all');
        const array = Object.values(res.data.msg);
        setGet(array);
        console.log("data",res.data.msg);
        console.log(typeof res.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        getData()
    },[])

    

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href=" #">Albumlist</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add album</li>
                </ol>
            </nav>
            <div className="flex-cols">
                <form method="POST">
                    <label >enter name</label>

                    <input type="text" name="name" value={info.name} onChange={handleInputs}  />
                    <br></br>
                    <br></br>
                    <label>enter description</label>
                    <textarea id="description" name="description" rows="3" cols="30" value={info.description} onChange={handleInputs}    />
                    <br></br>
                    <button onClick={postData} >submit</button>
                </form>
            </div>
            <div>
                <h1>albums</h1>

{/* {Object.values(get).map((item, index) => (
  <tr key={item._id}>
    <td>{index + 1}</td>
    <td>{item.name}</td>
    <td>{item.description}</td>
  </tr>
))} */}

                
                {/* <table className="border border-1">
                    <thead className="border border-1">
                        <tr >
                            <th className="border border-1">Index</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {get.map((item, index) => (
                            <tr key={item._id} className="border border-1">
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
  </table> */}
  {/* {
    get.map((item,index) => (
       <div>
         <h1>{index + 1}</h1>
        <p>{item.name}</p>
        <p>{item.description}</p>
       </div>

    ))
  } */}

  <table class="table">
  <thead>
    <tr>
    
      <th scope="col">index</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  {get.map((item, index) => (
        <tr key={item._id} >
             <td>{index + 1}</td>
             <td>{item.name}</td>
             <td>{item.description}</td>
             <td><img src={item.images} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover"}} /></td>
             {/* <td>{item.images.length}</td> */}
             <td>
                <a className ="btn btn-info" href={`/upload/${item.name}`}>..@!@..</a>
             </td>
            </tr>
                         
    ))}
  
  </tbody>
</table>



            </div>
        </>
    )
}

export default Addalbum;