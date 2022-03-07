import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './components/form';
import Item from './components/item'
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    axios
      .get('https://rocky-fortress-29259.herokuapp.com/sports')
      .then((response) => {
        setSports(response.data);
      })
  })


  return (
    <main>
      <div className="title">
        <h2>Let's Find You a Partner!</h2>
      </div>
      <Form setSports={setSports} />
      <Item item={sports} setSports={setSports} />
    </main >
  )
}

export default App;
