import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UpdateStore () {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  let history = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`/api/stores/${id}`);
        if (!response.ok) {
          throw new Error(`Bad server response, ${response.status}`);
        }
        const jsonData = await response.json();
        setName(jsonData.data.store.name);
        setLocation(jsonData.data.store.location);
        setPriceRange(jsonData.data.store.priceRange);
      } catch(err) {
        console.error(err);
      }
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Run once on mount
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/stores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name,
          location,
          priceRange
        })
      });
      if (!response.ok) {
        throw new Error(`Bad server response, ${response.status}`)
      }
      await response.json();
      history('/');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label htmlFor="name" className="fw-bold">Name</label>
        <input value={name} onChange={(e)=> setName(e.target.value)} id="name" className="form-control" required></input>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="location" className="label-container fw-bold">Location</label>
        <input value={location} onChange={(e)=> setLocation(e.target.value)} id="location" className="form-control" required></input>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="priceRange" className="label-container fw-bold">Price Range</label>
        <select value={priceRange} onChange={(e)=> setPriceRange(e.target.value)} className="form-select" required>
          <option>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Save Changes</button>
    </form>
  )
}
