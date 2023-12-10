import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

const navigate = useNavigate()
const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
})

const onChangeHandler = (e) => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/api/v1/users/loginUser', userLogin, {withCredentials:true})
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
        <div>
        <form onSubmit={handleSubmit} className='col-4 mx-auto user-form mt-5'>
            <label className='form-label'>Email:</label>
            <input type="text" name="email" className='form-control' onChange={onChangeHandler} value={userLogin.email} />

            <label className='form-label'>Password:</label>
            <input type="password" name="password" className='form-control' onChange={onChangeHandler} value={userLogin.password} />

            <button className='btn btn-dark border mt-3'>Login</button>
            <br />
            <Link className='text-white' to={'/'}>Dont have an account? Sign up here</Link>
        </form>
        </div>
    </div>
)
}

export default Login