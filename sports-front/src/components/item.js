import { useState } from 'react';
import React from 'react'
import axios from 'axios'



const Items = (props) => {

    // const [newMenu, setNewMenu] = useState([])

    const handleDelete = (itemData) => {
        axios
            .delete(`http://localhost:3000/sports/${itemData._id}`)
            .then(() => {
                axios
                    .get('http://localhost:3000/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }

    const handleToggleLFM = (itemData) => {
        axios
            .put(
                `http://localhost:3000/sports/${itemData._id}`,
                {

                    lfm: !itemData.lfm
                }
            )
            .then(() => {
                axios
                    .get('http://localhost:3000/sports')
                    .then((response) => {
                        props.setSports(response.data)
                    })
            })
    }


    return (
        <div>
            <ul className="flex">
                {
                    props.item.map((item) => {
                        return <li key={item._id}
                            onClick={(event) => { handleToggleLFM(item) }}>
                            {
                                (item.lfm) ?
                                    <h2>{item.name} (Need Players!)</h2> :
                                    <h2>{item.name} (Don't Need Players)</h2>
                            }
                            <h3>{item.description}</h3>
                            <h3>{item.lfm}</h3>
                            <h3>{item.lfmNumber}</h3>

                            <button onClick={(event) => { handleDelete(item) }}>Delete</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
export default Items