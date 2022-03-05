import { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';


const Form = (props) => {
    const [name, setNewName] = useState('');
    const [date, setNewDate] = useState('');
    const [description, setNewDescription] = useState('');
    const [location, setNewLocation] = useState('');
    const [lfm, setNewLFM] = useState(true);
    const [number, setNewNumber] = useState(0);


    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewDate = (event) => {
        setNewDate(event.target.value)
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
                date: date,
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

            <div className="formBackground">
                <div className="formContainer">
                    <form onSubmit={handleNewSportSubmit}>
                        <h3>Add Your Event in the Form Below</h3>
                        <strong>Sport:</strong> <input type='text' onChange={handleNewName} /><br />
                        <strong>Date/Time:</strong> <input type='date' onChange={handleNewDate} /><br />
                        <strong>Description:</strong> <input type='text' onChange={handleNewDescription} /><br />
                        <strong>Address/Location:</strong> <input type='text' onChange={handleNewLocation} /><br />
                        <strong>Looking For More Players?</strong> <input type='checkbox' onChange={handleNewLFM} /><br />
                        <strong>How Many?</strong> <input type='number' onChange={handleNewNumber} /><br />
                        <Button id="addButton" type='submit'>Add Item</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Form