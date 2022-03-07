import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';

const EditModal = (props) => {
    // const [description, setDescription] = useState(props.description)
    // const [name, setNewName] = useState(props.name);
    // const [date, setNewDate] = useState(props.date);
    // const [location, setNewLocation] = useState(props.location);
    // const [lfm, setNewLFM] = useState(true);
    // const [number, setNewNumber] = useState(props.number);

    const [editActivityName, setEditActivityName] = useState('')
    const [editActivityDescription, setEditActivityDescription] = useState('')
    const [editActivityDate, setEditActivityDate] = useState('')
    const [editActivityNumber, setEditActivityNumber] = useState('')
    const [editActivityLocation, setEditActivityLocation] = useState('')
    const [editFormId, setEditFormId] = useState('')

    const handleEditActivityName = (e) => {
        setEditActivityName(e.target.value)
    }
    const handleEditActivityLocation = (e) => {
        setEditActivityLocation(e.target.value)
    }
    const handleEditActivityDescription = (e) => {
        setEditActivityDescription(e.target.value)
    }
    const handleEditActivityDate = (e) => {
        setEditActivityDate(e.target.value)
    }
    const handleEditActivityNumber = (e) => {
        setEditActivityNumber(e.target.value)
    }

    const [modalShow, setModalShow] = React.useState(false);
    const [query, setQuery] = useState("")
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleShowEditForm = (activity) => {
        setEditFormId(activity._id)
        setEditActivityName(activity.name)
        setEditActivityDate(activity.date)
        setEditActivityLocation(activity.location)
        setEditActivityDescription(activity.description)
        setEditActivityNumber(activity.number)
    }

    const handleEditFormSubmit = (item, e) => {
        e.preventDefault()
        axios.put(`https://rocky-fortress-29259.herokuapp.com/sports/${item._id}`, {
            name: editActivityName,
            date: editActivityDate,
            description: editActivityDescription,
            location: editActivityLocation,
            // LFM = looking for more aka need
            lfmNumber: editActivityNumber
        })
            .then(() => {
                axios
                    .get('https://rocky-fortress-29259.herokuapp.com/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
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
                <form onSubmit={(event) => { handleEditFormSubmit(props, event) }}>
                    Sport: <input type="text" value={editActivityName} onChange={handleEditActivityName} /><br />
                    Date: <input type="date" value={editActivityDate} onChange={handleEditActivityDate} /><br />
                    Description: <input type="text" value={editActivityDescription} onChange={handleEditActivityDescription} /><br />
                    Location: <input type="text" value={editActivityLocation} onChange={handleEditActivityLocation} /><br />Players Needed: <input type="text" value={editActivityNumber} onChange={handleEditActivityNumber} /><br />

                    <input type="submit" value="Update this activity" /><br />
                    <Button id="modalButton" type='submit' variant="success">
                        Submit Changes
                </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default EditModal

