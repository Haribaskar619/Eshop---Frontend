import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan , faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from '../navbar/navbar';




function Editproducts() {
    const [datas, setDatas] = useState([]);
    const [selprod , setSelprod] = useState([]);
    const [counter , setCounter] = useState(0);
    const [newdata , setNewdata] = useState({
      category: "",
      description:"",
      image:"",
      price:"",
      count:"",
      rate:"",
      title:"",
    });
    const [ image , setImage] = useState("")
    axios.interceptors.request.use(function (config) {
      config.headers =  {
        "Authorization" : localStorage.getItem("apps_token")
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      setNewdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const resetField = () => {
      setNewdata({
        category: "",
      description:"",
      image:"",
      price:"",
      count:"",
      rate:"",
      title:"",
      });
      setImage({
        image : "",
      })
    }
      const updateProdData = async (id) => {
        const isUpdated =  await axios.put(`http://localhost:5000/updateproductdata/${id}`,newdata,newdata.image = image).then((res)=>{
          setCounter(counter + 1);
        }).catch((err)=> {
          console.log(err);
      })
     
      if(isUpdated){
        setNewdata({
          category: "",
        description:"",
        image:"",
        price:"",
        count:"",
        rate:"",
        title:"",
        });
      }};

      const deleteProdData = async (id) => {
        const isDeleted =  await axios.delete(`http://localhost:5000/delproductdata/${id}`).then((res)=>{
          console.log(res);
          setCounter(counter + 1);
        }).catch((err)=> {
          console.log(err);
      })

      if(isDeleted){
          alert('Updated')
      }};

      const updateNewProdData = async (item) => {
        await axios.get(`http://localhost:5000/getproddata/${item}`).then((res) => {
          setNewdata({
            category: res.data.category,
            description:res.data.description,
            image:res.data.image,
            price:res.data.price,
            count:res.data.rating.count,
            rate:res.data.rating.rate,
            title:res.data.title,
          })
          setSelprod(item);
        }).catch((err)=> {
          console.log(err);
        })
      }
  
    useEffect(() => {
          axios.get("http://localhost:5000/getproductdata").then((res) => {
            setDatas(res.data);
          })      
      }, [counter])

      const uploadImage = async (e) => {
        const files = e.target.files;
        const file = files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
        console.log(base64)
    }
  
    const convertBase64 = (file) => {
      return new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }  


  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className='container'>
      <div className='row'>
     <div className='col-6 mt-3'>
                <h3 className='text-center'>Product List</h3>
                <ul className='list-group list-group-numbered'>
            {datas ? ( 
             datas.map((item) =>{
                    return(<li class="list-group-item">{item.title}
                        <button className="btn btn-outline-warning ms-3" onClick={() => updateNewProdData(item._id)} > <FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button className="btn btn-outline-danger ms-3" onClick={() =>deleteProdData(item._id)}>  <FontAwesomeIcon icon={faTrashCan} /></button>
                        </li>
                      ) 
                  })
            ) : (
                <h3> Loading......</h3>
            )
            }
             </ul>
            </div>
            <div className='col-6 mt-3'>
                <h3 className='text-center'>Update Product Detail</h3>
            <div className="card p-4">
                <div className="col">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="category"
                    className="form-control"
                    id="category"
                    name="category"
                    value={newdata.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="description"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={newdata.description}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label for="formFile" className="form-label">
                    Image
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="file"
                    className="form-control"
                    id="formFile"
                    name="formFile"
                    onChange={(e)=> {uploadImage(e)}}
                    value={image.image}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="price"
                    className="form-control"
                    id="price"
                    name="price"
                    onChange={handleChange}
                    value={newdata.price}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="count" className="form-label">
                    Count
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="count"
                    className="form-control"
                    id="count"
                    name="count"
                    onChange={handleChange}
                    value={newdata.count}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="rate" className="form-label">
                    Rate
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="rate"
                    className="form-control"
                    id="rate"
                    name="rate"
                    onChange={handleChange}
                    value={newdata.rate}
                  />
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="title"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    value={newdata.title}
                  />
                </div>
                <div className="col-12 mt-4  d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary" onClick={() => updateProdData(selprod)}>
                    Update
                  </button>
                  <button  type="submit" className="btn btn-primary ms-3" onClick={resetField}>
                    Reset 
                  </button>
                </div>
            </div>
            </div>
            </div>
            </div>
    </>
  )
}

export default Editproducts;