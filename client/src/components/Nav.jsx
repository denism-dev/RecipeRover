import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const navStyles = {
    container: {
        backgroundColor: '#2c3e50',
        padding: '10px 20px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#ecf0f1',
        margin: '0',
        fontSize: '2.5em',
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'space-around', 
        width: '30%', 
    },
    link: {
        color: '#4a9ef7',
        textDecoration: 'none',
        fontSize: '1.2em', 
        fontWeight: 'bold', 
        padding: '5px 10px', 
        borderRadius: '5px', 
    },
    }

const Nav = () => {

    const navigate = useNavigate();

    const logoutUser = () => {
    axios.post('http://localhost:3000/api/v1/users/logoutUser', {}, { withCredentials: true })
        .then(() => {
        navigate('/login')
        })
        .catch((err) => {
        console.error(err)
        })
    }
return (
    <div style={navStyles.container}>
        <h1  style={navStyles.title}>Recipe Rover</h1>
        <div style={navStyles.navLinks}>
        <Link to={"/displayAll"} style={navStyles.link}>My Recipes</Link>
        <Link to={"/createRecipe"} style={navStyles.link}>Create A Recipe</Link>
        <button onClick={logoutUser} >Logout</button>
        </div>
    </div>
)
}


export default Nav