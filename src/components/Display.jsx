import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Form from './Form'
import {Link, useParams} from 'react-router-dom'

const Display = props => {

    const {type, id} = useParams()
    const [person, setPerson] = useState({})
    const [planets, setPlanets] = useState({})
    const [species, setSpecies] = useState({})
    // const [species, setSpecies] = useState({})
    const [starships, setStarships] = useState({})
    const [error, setError] = useState(false)
    const [homeworld, setHomeworld] = useState('')
    const [displayWorld, setDisplayWorld] = useState('')

    useEffect( ()=> {
        axios.get(`https://swapi.dev/api/${type}/${id}`)
        .then( (res) => {
            setError(false)
            console.log(res.data)

            if( type === 'people'){
                setPerson(res.data)
                setHomeworld(res.data.homeworld)
            }
            else if(type === 'planets'){
                setPlanets(res.data)
            }
            else if(type === 'species'){
                setSpecies(res.data)
            }
            else if(type === 'starships'){
                setStarships(res.data)
            }
        })
        .catch( (err) => {
            setError(true)
            console.log(err)
        })
    }, [type, id])

    useEffect( ()=>{
        if(homeworld){
            axios.get(homeworld)
            .then((res)=>{
                console.log(res.data)
                    setDisplayWorld({
                        name:res.data.name,
                        url: res.data.url,
                        planetNum: res.data.url.match(/\d+/g)[0]

                    })
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            console.log("no homeworld")
        }
        
    }, [homeworld])

    return(
        <div>
            <Form />
            {
                error ? 
                <div>
                    <p>These are not the droids you're looking for</p>
                    <img src="https://www.moviemaker.com/wp-content/uploads/2021/11/Obi-Wan-Kenobi.jpg?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2" width="400" alt='Obi-Wan'></img>
                </div>
                
                : null
            }
            {
                type === 'people' && !error?
                <div>
                    <h1>Person</h1>
                    <p>Name: {person.name}</p>
                    <p>Height: {person.height}</p>
                    <p>Eye Color: {person.eye_color}</p>
                    <p>Gender: {person.gender}</p>
                    <Link to={`/display/planets/${displayWorld.planetNum}`}>Home World:{displayWorld.name}</Link>
                </div>
                :null
            }
            {
                type === 'planets' && !error?
                <div>
                    <h1>Planets</h1>
                    <p>Name: {planets.name}</p>
                    <p>Population: {planets.population}</p>
                    <p>terrain: {planets.terrain}</p>
                    <p>surface_water: {planets.surface_water}</p>
                </div>
                :null
            } 
            {
                type === 'species' && !error?
                <div>
                    <h1>Species</h1>
                    <p>Name: {species.name}</p>
                    <p>language: {species.language}</p>
                    <p>classification: {species.classification}</p>
                    <p>designation: {species.designation}</p>
                </div>
                :null
            } 
            {
                type === 'starships' && !error?
                <div>
                    <h1>Starships</h1>
                    <p>Name: {starships.name}</p>
                </div>
                :null
            } 
        </div>
    )
}
export default Display