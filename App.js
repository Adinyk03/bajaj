import React, { useState } from 'react';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const options = [
    { label: 'Alphabets', value: 'alphabets' },
    { label: 'Numbers', value: 'numbers' },
    { label: 'Highest lowercase alphabet', value: 'highest_lowercase_alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async () => {
  try {
    const parsedInput = JSON.parse(jsonInput);
    if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
      setError('Invalid JSON format.');
      return;
    }
    setError(null);

    const response = await fetch('http://127.0.0.1:5000/bfhl', {  // Make sure the URL matches your Flask server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedInput),
    });

    const result = await response.json();
    setResponse(result);
  } catch (error) {
    setError('Invalid JSON input.');
  }
};


  return (
    <div>
      <h1>{'21BCE0540'}</h1>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder='Enter JSON (e.g., { "data": ["A", "B", "C", "1"] })'
          value={jsonInput}
          onChange={handleInputChange}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {response && (
        <div>
          <h3>Choose the data to display:</h3>
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                onChange={handleSelectChange}
              />
              {option.label}
            </label>
          ))}

          <div>
            <h3>Response:</h3>
            <ul>
              {selectedOptions.includes('alphabets') && (
                <li>Alphabets: {response['6.alphabets'].join(', ')}</li>
              )}
              {selectedOptions.includes('numbers') && (
                <li>Numbers: {response['5.numbers'].join(', ')}</li>
              )}
              {selectedOptions.includes('highest_lowercase_alphabet') && (
                <li>Highest Lowercase Alphabet: {response['7.highest_lowercase_alphabet'].join(', ')}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
