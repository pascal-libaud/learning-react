import React, { useState, useEffect, useRef } from 'react';
import './App.css';



function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const count = useRef<number>(0);
  const inputElement = useRef<HTMLInputElement>(null);
  const previousInputValue = useRef<string>("");


  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    count.current = count.current + 1;
  });

  const focusInput = () => {
    inputElement.current!.focus();
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={inputValue}
          ref={inputElement}
          onChange={(e) => setInputValue(e.target.value)} />
        <div>
          <button onClick={focusInput}>Focus Input</button>
          <h4>Current Value: {inputValue}</h4>
          <h4>Previous Value: {previousInputValue.current}</h4>
        </div>
        <h3>Render Count: {count.current}</h3>
      </header>
    </div>
  );
}

export default App;
