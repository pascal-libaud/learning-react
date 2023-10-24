import React, { useState, createContext, useContext } from 'react';
import logo from './logo.svg';
import './App.css';

const UserContext = createContext<string>("");

function Component1() {
  const [user, setUser] = useState<string>("Pascal");

  return (
    <UserContext.Provider value={user}>
      <h2>{`Hello ${user}!`}</h2>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h3>Component 2</h3>
      <Component3 />
    </>
  )
}

function Component3() {
  return (
    <>
      <h3>Component 3</h3>
      <Component4 />
    </>
  );
}

function Component4() {
  const user = useContext(UserContext);

  return (
    <>
      <h3>Component 4</h3>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  )
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Component1 />
      </header>
    </div>
  );
}

export default App;
