import { useState } from 'react';
import React from 'react'
import axios from 'axios'



const Items = (props) => {

    // const [newMenu, setNewMenu] = useState([])

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
            <div className="container">
                {
                    props.item.map((item) => {
                        return (
                            <div className="card">
                                <span key={item._id}
                                    onClick={(event) => { handleToggleLFM(item) }}>
                                    {
                                        (item.lfm) ?
                                            <h2>{item.name} (Need Players!)</h2> :
                                            <h2>{item.name} (Doesn't Need Players)</h2>
                                    } </span>
                                <p><strong>{item.description}</strong></p>
                                <p><strong>Location: {item.location}</strong></p>
                                <p><strong>Players Needed: {item.lfmNumber}</strong></p>

                                <button onClick={(event) => { handleDelete(item) }}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Items