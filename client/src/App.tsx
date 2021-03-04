import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const fileRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()

    if (fileRef.current){
      formData.append('review', fileRef.current.files![0], 'k')
      axios.post('http://localhost:4000/upload', formData).then(console.log).catch(console.log)
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="review" ref={fileRef}/>
        <button type="submit">Sub</button>
      </form>
    </div>
  );
}

export default App;
