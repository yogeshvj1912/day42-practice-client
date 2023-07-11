
import './App.css';
import axios from 'axios';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';


const App = () => {
  const [loading,setLoading]=useState(false)
  const [userList,setUserList]=useState([]);
const myformik = useFormik({
initialValues:{
  name:"",
  email:"",
  age:""
},
validate:(values)=>{
let errors = {}
if (!values.name) {
errors.name = "please enter your name"
}if (!values.email) {
  errors.email = "please enter a email"
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email="please enter a valide email"
  }if (!values.age) {
    errors.age = "please enter your age"
    }
    return errors
},
onSubmit:async(values)=>{
  try {
    console.log(values)
    setLoading(true)
    await axios.post("https://practice-e5z0.onrender.com/create-user",values)
    setLoading(false)
    getUsers()
  } catch (error) {
    console.log(error);
    alert("validation Error");
    setLoading(false)
  }
}
})

useEffect(()=>{
  getUsers();
},[]);

let getUsers=async()=>{
  try {
    const userdata = await axios.get("https://practice-e5z0.onrender.com")
    setUserList(userdata.data);
    
  } catch (error) {
    console.log(error)
  }
}




  return (
    <div className="row">
      <div className="col-md-4">
     <form onSubmit={myformik.handleSubmit}>
      <div>
      <label >Name</label>
      <input type="text" value={myformik.values.name} onChange={myformik.handleChange} name="name" className="form-control" />
      <span style={{ color: "red" }}>{myformik.errors.name}</span>
      </div>
      <div>
      <label >Email</label>
      <input type="email" value={myformik.values.email} onChange={myformik.handleChange} name="email" className="form-control" />
      <span style={{ color: "red" }}>{myformik.errors.email}</span>
      </div>
      <div>
      <label> Age</label>
      <input type="number" value={myformik.values.age} onChange={myformik.handleChange} name="age" className="form-control" />
      <span style={{ color: "red" }}>{myformik.errors.age}</span>
      </div>
     
      <div className='button'>
                  <input disabled={loading} type={"submit"} value={loading ? "Loading...":"Create"} className='btn btn-primary' />
      </div>

     </form>
      </div>
      <div className="col-md-8">
      <table className="table table-dark table-hover">
 
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    {
      userList.map((ele,i) =>{
       return<tr key={i}>
       <th scope="row" >{i+1}</th>
       <td>{ele.name}</td>
       <td>{ele.email}</td>
       <td>{ele.age}</td>
     </tr>
      })
    }
  </tbody>
</table>

      </div>
    </div>
  );
};




export default App;
