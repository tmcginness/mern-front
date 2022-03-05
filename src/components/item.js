import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import EditModal from './modal'
import Button from 'react-bootstrap/Button';



const Items = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

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
            <div className="container">

                {
                    props.item.map((item) => {
                        return (
                            <div className="card" >
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
                                    <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Edit
                                </Button>
                                </div>

                                <EditModal
                                    name={item.name}
                                    date={item.date}
                                    description={item.description}
                                    location={item.location}
                                    needed={item.lfmNumber}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Items