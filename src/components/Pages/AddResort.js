import React from 'react';
 import "./resorts.css";

export default function AddResort() {
  
  const [house, setHouse] = useState({
    name: "",
     city_name: "",
    fee:"",
    description: "",
     image_ur: "",
  });


  const inputValue = (e) => {
    setHouse({
      ...house,
      [e.target.name]: e.target.value,
    });
  };

   const addHouse = async (resort) => {

    try {
      const response = fetch("http://localhost:$000/api/v1/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resort),
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addHouse(house);
    e.target.reset();
  };

  return (
    <div className="form-container">
      <h3 className="add-book-title">ADD NEW RESORT</h3>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={inputValue}
          required
          className="add-input"
        />
        <input
          type="string"
          name="city-name"
          placeholder="city name"
          onChange={inputValue}
          required
          className="add-input"
        />
        <input
          type="decimal"
          name="feel"
          placeholder="feel"
          onChange={inputValue}
          required
          className="add-input"
        />
        <input
          type="text"
          name="discription"
          placeholder="discription"
          onChange={inputValue}
          required
          className="add-input"
        />
        <input
          type="text"
          name="image-ur"
          placeholder="image"
          onChange={inputValue}
          required
          className="add-input"
        />
        <input
          type="integer"
          name="bedroom_number"
          placeholder="bedroom number"
          onChange={inputValue}
          required
          className="add-input"
        />
        <button type="submit" className="form-button">
          Add resort
        </button>
      </form>
    </div>
  );
};


