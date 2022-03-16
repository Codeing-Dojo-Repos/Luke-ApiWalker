import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Form = props => {

    const [type, setType] = useState('people')
    const [id, setId] = useState(0)

    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault();
        navigate(`/display/${type}/${id}`)
        setType('people')
        setId(0)
    }

    return(
        <div>
            Form
            <form onSubmit={submitHandler}>
                <label>Search for:</label>

                <select value={type} name='type' onChange={ (e)=>{
                    console.log(e.target.value)
                    setType(e.target.value)
                }}>
                    <option value='people'>People</option>
                    <option value='planets'>Planets</option>
                </select>

                <label>ID:</label>
                <input value={id} onChange={ (e)=>setId(e.target.value) } type='number'/>

                <button>Search</button>

            </form>
        </div>
    )
}
export default Form