import { useState } from 'react';
import axios from 'axios'


const Form = (props) => {
    const [name, setNewName] = useState('');
    const [description, setNewDescription] = useState('');
    const [location, setNewLocation] = useState('');
    const [lfm, setNewLFM] = useState(true);
    const [number, setNewNumber] = useState(0);


    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewDescription = (event) => {
        setNewDescription(event.target.value)
    }

    const handleNewLocation = (event) => {
        setNewLocation(event.target.value)
    }

    const handleNewLFM = (event) => {
        setNewLFM(event.target.checked)
    }
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNewSportSubmit = (e) => {
        e.preventDefault();
        axios.post(
            'https://rocky-fortress-29259.herokuapp.com/sports',
            {
                name: name,
                description: description,
                location: location,
                // LFM = looking for more aka need
                lfm: lfm,
                lfmNumber: number
            }
        ).then(() => {
            axios
                .get('https://rocky-fortress-29259.herokuapp.com/sports')
                .then((response) => {
                    props.setSports(response.data)
                })
        })
    }


    return (
        <>
            <h2>Let's Find You a Partner!</h2>
            <form onSubmit={handleNewSportSubmit}>
                Name: <input type='text' onChange={handleNewName} /><br />
                Description: <input type='text' onChange={handleNewDescription} /><br />
                Location: <input type='text' onChange={handleNewLocation} /><br />
                Looking For More Players? <input type='checkbox' onChange={handleNewLFM} /><br />
                How Many? <input type='number' onChange={handleNewNumber} /><br />
                <input type='submit' value='Add Item' />
            </form>
        </>
    )
}

export default Form