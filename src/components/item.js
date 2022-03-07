import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import EditModal from './modal'
import Button from 'react-bootstrap/Button';




const Items = (props) => {

    const [editActivityName, setEditActivityName] = useState('')
    const [editActivityDescription, setEditActivityDescription] = useState('')
    const [editActivityDate, setEditActivityDate] = useState('')
    const [editActivityNumber, setEditActivityNumber] = useState('')
    const [editActivityLocation, setEditActivityLocation] = useState('')
    const [editFormId, setEditFormId] = useState('')
    const [card, setCard] = useState('card')

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

    const handleCancel = () => {
        setEditFormId('')
        setCard('card')
    }

    const [modalShow, setModalShow] = React.useState(false);
    const [query, setQuery] = useState("")
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleShowEditForm = (item) => {
        setCard('cardToggled')
        setEditFormId(item._id)
        setEditActivityName(item.name)
        setEditActivityLocation(item.location)
        setEditActivityDescription(item.description)
        setEditActivityNumber(item.number)
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

                {
                    props.item.filter(item => {
                        if (query === '') {
                            return item;
                        } else if (item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase())) {
                            return item;
                        }
                    }).map((item) => {
                        return (
                            <div className={card} >
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
                                <p><strong>Players Needed: {item.lfmNumber}</strong></p>
                                <div className="buttons">
                                    <Button variant="danger" onClick={(event) => { handleDelete(item) }}>Delete</Button>
                                    {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Edit
                                </Button> */}
                                    <Button variant="primary" onClick={() => { handleShowEditForm(item) }}>
                                        Edit
                                </Button>
                                </div>


                                {
                                    (editFormId === item._id) ?
                                        <form onSubmit={(event) => { handleEditFormSubmit(item, event) }}>
                                            Sport: <input type="text" onChange={handleEditActivityName} /><br />
                                            Date: <input type="date" onChange={handleEditActivityDate} /><br />
                                            Description: <input type="text" onChange={handleEditActivityDescription} /><br />
                                            Location: <input type="text" onChange={handleEditActivityLocation} /><br />Players Needed: <input type="text" onChange={handleEditActivityNumber} /><br />

                                            <Button id="submitEdit" type="submit" >Update this activity</Button>
                                            <Button id="cancel" onClick={handleCancel}>Cancel Edit</Button>
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