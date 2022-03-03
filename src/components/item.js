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
            <div className="flex">
                {
                    props.item.map((item) => {
                        return <h2 key={item._id}
                            onClick={(event) => { handleToggleLFM(item) }}>
                            {
                                (item.lfm) ?
                                    <h2>{item.name} (Need Players!)</h2> :
                                    <h2>{item.name} (Doesn't Need Players)</h2>
                            }
                            <h3>{item.description}</h3>
                            <h3>{item.location}</h3>
                            <h3>{item.lfm}</h3>
                            <h3>{item.lfmNumber}</h3>

                            <button onClick={(event) => { handleDelete(item) }}>Delete</button>
                        </h2>
                    })
                }
            </div>
        </div>
    )
}
export default Items