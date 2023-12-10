import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

const navigate = useNavigate()
const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email:"",
    password:"",
    confirmPassword:""
})

const [error, setError] = useState()

const changeHandler = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
}

const submitHandler= (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/api/v1/users/registerUser', user, {withCredentials:true})
    .then((res) => {
        console.log(res)
        navigate('/displayAll')
    })
    .catch((err)=>{
        console.log(err)


    })
}

    return (
    <div>
        <form className='w-50 mx-auto' onSubmit={submitHandler}>
            <div>
                <label className="form-label">First Name:</label>
                <input type="text" className="form-control" value={user.firstName} name='firstName' onChange={changeHandler}/>
            </div>
            <div>
                <label className="form-label">Last Name:</label>
                <input type="text" className="form-control" value={user.lastName} name='lastName' onChange={changeHandler}/>
            </div>
            <div>
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value={user.email} name='email' onChange={changeHandler}/>
            </div>
            <div>
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" value={user.password} name='password' onChange={changeHandler}/>
            </div>
            <div>
                <label className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" value={user.confirmPassword} name='confirmPassword' onChange={changeHandler}/>
            </div>
            <button className='btn btn-primary d-block'>Register</button>
            <Link to={'/login'}>Already Have An Account?</Link>
        </form>
    </div>
)
}

export default Register