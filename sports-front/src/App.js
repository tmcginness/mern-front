import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const App = () => {

  const [sports, setSports] = useState([]);
  const [name, newName] = useState('');
  const [description, newDescription] = useState('');
  const [location, newLocation] = useState('');
  const [lfm, newLFM] = useState(true);
  const [number, newNumber] = useState(0);


  useEffect(() => {
    axios
      .get('http://localhost:3000/sports')
      .then((response) => {
        setSports(response.data);
      })
  })

  const handleNewSportFormSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3000/sports',
      {
        name: newName,
        description: newDescription,
        location: newLocation,
        // LFM = looking for more aka need
        lfm: newLFM,
        lfmNumber: newNumber
      }
    ).then(() => {
      axios
        .get('http://localhost:3000/sports')
        .then((response) => {
          setSports(response.data)
        })
    })
  }

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
      .delete(`http://localhost:3000//${sportsData._id}`)
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
      <h1>Hello World</h1>
    </main >
  )
}

export default App;
