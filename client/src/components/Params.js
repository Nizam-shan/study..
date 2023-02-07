
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Params = async(name) => {
//   // const [get,setGet] = useState(['']);
//   // const getData = async(name) => {
     
//   //     try{
//   //     const res = await axios.get('/getupload/:name');
//   //     const array = Object.values(res.data.msg);
//   //     setGet(array);
//   //     console.log("data",res.data.msg);
//   //     console.log(typeof res.data);
//   //     } catch (err) {
//   //         console.log(err);
//   //     }
//   // }
//   // useEffect(()=>{
//   //     getData()
//   // },[])
//   //const GetUpload = async(name) => {
//         try {
//             const response = await axios.get(`/getupload/${name}`);
//             console.log(response.data);
//             return response.data;
//            console.log(response.data);
//            history.push('./Albumlist');
//         } catch (error) {
//             console.error(error);
//             return { msg: "unable to fetch data" };
//         }
//     };
//    return(
//     <table class="table">
//     <thead>
//       <tr>
      
//         <th scope="col">index</th>
//         <th scope="col">Last</th>
//         <th scope="col">Handle</th>
//       </tr>
//     </thead>
//     <tbody>
//     {get.map((item, index) => (
//           <tr key={item._id} >
//                <td>{index + 1}</td>
//                <td>{item.name}</td>
//                <td>{item.description}</td>
//                <td>
                  
//                </td>
//               </tr>
                           
//       ))}
    
//     </tbody>
//   </table>
  
//    )

// }

// export default Params;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const DisplayUpload = ({ name }) => {
// //     const [album, setAlbum] = useState(null);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await axios.get(`/getupload/${name}`);
// //                 setAlbum(response.data.album);
// //             } catch (error) {
// //                 setError(error);
// //             }
// //         };
// //         fetchData();
// //     }, [name]);

// //     if (error) {
// //         return <div>{error.message}</div>;
// //     }

// //     if (!album) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div>
// //             <h2>{album.name}</h2>
// //             <p>{album.description}</p>
// //         </div>
// //     );
// // };

// // export default DisplayUpload;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Params = ({ name }) => {
    const [album, setAlbum] = useState(['']);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/getupload/${name}`);
                // setAlbum(response.data.msg);
                // console.log(response.data.msg);
                //const array = Object.values(res);
                setAlbum(res);
                console.log("data",res);
                console.log(typeof res);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    },[name]);

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!album) {
        return <div>Loading...</div>;
    }

    return (
         <div>
            {/* <h2>{album.name}</h2>
            <p>{album.description}</p> */}
            <h1>fbhbhggvg</h1>
            
         </div>
    );
};

export default Params;
