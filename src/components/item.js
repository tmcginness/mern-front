import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import EditModal from './modal'
import Button from 'react-bootstrap/Button';


const Items = (props) => {

    // Set variables for editing
    const [editActivityName, setEditActivityName] = useState('')
    const [editActivityContact, setEditActivityContact] = useState('')
    const [editActivityDescription, setEditActivityDescription] = useState('')
    const [editActivityDate, setEditActivityDate] = useState('')
    const [editActivityNumber, setEditActivityNumber] = useState('')
    const [editActivityLocation, setEditActivityLocation] = useState('')
    const [editFormId, setEditFormId] = useState('')
    const [card, setCard] = useState('card')

    // Editing functions for each input
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
    const handleEditActivityContact = (e) => {
        setEditActivityContact(e.target.value)
    }
    const handleEditActivityNumber = (e) => {
        setEditActivityNumber(e.target.value)
    }

    // If user cancels editing, close form and reset styling to default
    const handleCancel = () => {
        setEditFormId('')
        setCard('card')
    }

    const [modalShow, setModalShow] = React.useState(false);

    // Search bar functionality
    const [query, setQuery] = useState("")
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // If user clicks 'edit' show form and keep content of other cards at the top
    const handleShowEditForm = (item) => {
        setCard('cardToggled')
        setEditFormId(item._id)
        setEditActivityName(item.name)
        setEditActivityLocation(item.location)
        setEditActivityContact(item.contact)
        setEditActivityDescription(item.description)
        setEditActivityNumber(item.number)
    }

    // If user submits edit form, PUT the inputs, and close the form
    const handleEditFormSubmit = (item, e) => {
        e.preventDefault()
        axios.put(`https://rocky-fortress-29259.herokuapp.com/sports/${item._id}`, {
            name: editActivityName,
            date: editActivityDate,
            description: editActivityDescription,
            location: editActivityLocation,
            contact: editActivityContact,
            // LFM = looking for more aka need
            lfmNumber: editActivityNumber
        })
            .then(() => {
                setEditFormId('')
                setCard('card')
                axios
                    .get('https://rocky-fortress-29259.herokuapp.com/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }

    // If user hits DELETE button, remove item from DB
    const handleDelete = (itemData) => {
        axios
            .delete(`https://rocky-fortress-29259.herokuapp.com/sports/${itemData._id}`)
            .then(() => {
                axios
                    .get('https://rocky-fortress-29259.herokuapp.com/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }


    // If user clicks on activity title (h2) toggle whether or not they need players
    const handleToggleLFM = (itemData) => {
        axios
            .put(
                `https://rocky-fortress-29259.herokuapp.com/sports/${itemData._id}`,
                {

                    lfm: !itemData.lfm
                }
            )
            .then(() => {
                axios
                    .get('https://rocky-fortress-29259.herokuapp.com/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }


    return (
        <div>
            <h2 className="containerTitle">Looking For A Game? Check Out Below!</h2>
            <div className="searchBar">
                <input placeholder="Search For A Sport Or Location" onChange={event => setQuery(event.target.value)} />
            </div>
            <div className="container">
                {/* Search Bar, if location or title contains query, display it*/}
                {
                    props.item.filter(item => {
                        if (query === '') {
                            return item;
                        } else if (item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase())) {
                            return item;
                        }
                    }).map((item) => {
                        return (

                            < div className={card} >
                                {/* Toggle 'Need players or Don't */}
                                <span key={item._id}
                                    onClick={(event) => { handleToggleLFM(item) }}>
                                    {
                                        (item.lfm) ?
                                            <h2>{item.name} (Need Players!)</h2> :
                                            <h2>{item.name} (Doesn't Need Players)</h2>
                                    } </span>
                                <p><strong>Date/Time: {item.date}</strong></p>
                                <p><strong>{item.description}</strong></p>
                                <p><strong>Location: {item.location}</strong></p>
                                <p><strong>Contact Info: {item.contact}</strong></p>
                                {/* Toggle players needed to 0 if none needed */}
                                {
                                    (item.lfm) ?
                                        <p><strong>Players Needed: {item.lfmNumber}</strong></p>
                                        :
                                        <p><strong>Players Needed: 0</strong></p>
                                }

                                <div className="buttons">
                                    <Button variant="danger" onClick={(event) => { handleDelete(item) }}>Delete</Button>
                                    {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Edit
                                </Button> */}
                                    <Button variant="primary" onClick={() => { handleShowEditForm(item) }}>
                                        Edit
                                </Button>


                                </div>

                                {/* Show edit form if user clicks 'edit' */}
                                {
                                    (editFormId === item._id) ?
                                        <form onSubmit={(event) => { handleEditFormSubmit(item, event) }}>
                                            Sport: <input type="text" value={editActivityName} onChange={handleEditActivityName} /><br />
                                            Date: <input type="date" onChange={handleEditActivityDate} /><br />
                                            Description: <input value={editActivityDescription} type="text" onChange={handleEditActivityDescription} /><br />
                                            Location: <input value={editActivityLocation} type="text" onChange={handleEditActivityLocation} /><br />Players Needed: <input type="number" value={editActivityNumber} onChange={handleEditActivityNumber} /><br />
                                            Contact Info: <input type="text" value={editActivityContact} onChange={handleEditActivityContact} /><br />

                                            <Button variant="success" id="submitEdit" type="submit" >Update this activity</Button>
                                            <Button id="cancel" variant="danger" onClick={handleCancel}>Cancel Edit</Button>
                                        </form> :
                                        ''
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Items