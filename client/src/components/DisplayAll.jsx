import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DisplayAll = () => {
const [allRecipes, setAllRecipes] = useState([])

const navigate = useNavigate()
const { id } = useParams()

useEffect(() => {
    // add actual route from back end underneath this line
    axios.get('http://localhost:8000/api/')
    .then(res => {
        console.log(res)
        setAllRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

const handleDelete = (id) => {
    // add actual route from back end underneath this line
    axios.delete('http://localhost:8000/api/')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

return (
    <div>
        <div>
        <h2>All Your Delicious Recipes</h2>
        </div>
        <div>
            
        </div>
    </div>
)
}

export default DisplayAll