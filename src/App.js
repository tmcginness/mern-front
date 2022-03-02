import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './components/form';
import Item from './components/item'

const App = () => {

  const [sports, setSports] = useState([]);



  useEffect(() => {
    axios
      .get('http://localhost:3000/sports')
      .then((response) => {
        setSports(response.data);
      })
  })

  const handleToggleLFM = (sportsData) => {
    axios
      .put(`http://localhost:3000/${sportsData._id}`,
        {
          name: sportsData.name,
          lfm: !sportsData.lfm
        }
      ).then(() => {
        axios
          .get('http://localhost:3000/sports')
          .then((response) => {
            setSports(response.data)
          })
      })
  }


  const handleDelete = (sportsData) => {
    axios
      .delete(`http://localhost:3000/${sportsData._id}`)
      .then(() => {
        axios
          .get('http://localhost:3000/sports')
          .then((response) => {
            setSports(response.data)
          })
      })
  }


  return (
    <main>
      <Item item={sports} setSports={setSports} />
      <Form setSports={setSports} />
    </main >
  )
}

export default App;
