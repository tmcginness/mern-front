import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';

const EditModal = (props) => {
    const [description, setDescription] = useState(props.description)
    const [name, setNewName] = useState(props.name);
    const [date, setNewDate] = useState(props.date);
    const [location, setNewLocation] = useState(props.location);
    const [lfm, setNewLFM] = useState(true);
    const [number, setNewNumber] = useState(props.number);

    const formEdit = (itemData) => {
        itemData.preventDefault()
        axios.put(
            `https://rocky-fortress-29259.herokuapp.com/sports/${itemData._id}`,
            {
                description: description
            }).then(() => {
                axios
                    .get('https://rocky-fortress-29259.herokuapp.com/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }


    const changeDescription = (event) => {
        setDescription(event.target.value)
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit This Event
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formEdit}>
                    Sport:<input defaultValue={props.name} />
                    Date:<input defaultValue={props.date} />
                    Location:<input defaultValue={props.location} />
                    Description:<input defaultValue={props.description} onChange={changeDescription} />
                    <Button id="modalButton" type='submit' variant="success">
                        Submit Changes
                </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal

