import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Form from './Form'
import {Link, useParams} from 'react-router-dom'

const Display = props => {

    const {type, id} = useParams()
    const [person, setPerson] = useState({})
    const [planets, setPlanets] = useState({})
    const [error, setError] = useState(false)

    useEffect( ()=> {
        axios.get(`https://swapi.dev/api/${type}/${id}`)
        .then( (res) => {
            setError(false)
            console.log(res.data)
            if( type === 'people'){
                setPerson(res.data)
            }else{
                setPlanets(res.data)
            }
        })
        .catch( (err) => {
            setError(true)
            console.log(err)
        })
    }, [type, id])

    return(
        <div>
            <Form />
            {
                error ? 
                <p>These are not the droids you're looking for</p>
                : null
            }
            {
                type === 'people' ?
                <div>
                    <h1>Person</h1>
                    <p>Name: {person.name}</p>
                    <p>Height: {person.height}</p>
                    <p>Eye Color: {person.eye_color}</p>
                    <p>Gender: {person.gender}</p>
                </div>
                :null
            }
            {
                type === 'planets' ?
                <div>
                    <h1>Planets</h1>
                    <p>Name: {planets.name}</p>
                    <p>Population: {planets.population}</p>
                    <p>terrain: {planets.terrain}</p>
                    <p>surface_water: {planets.surface_water}</p>
                </div>
                :null
            } 
        </div>
    )
}
export default Display