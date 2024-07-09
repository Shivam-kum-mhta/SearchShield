// src/App.jsx
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import LoginPage from './components/Loginpg';
import History from './components/History';
import About from './components/About';
function App() {
  const tabswitch = { id1: [0] };
  const [switchh, setSwitchh] = useState(tabswitch);
  const [prevTab, setPrevTab] = useState('id1');
  const [login, setLogin] = useState(false);
  const [search, setSearch] = useState('');
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app-container">
          <Nav switchh={switchh} setSwitchh={setSwitchh} prevTab={prevTab} setPrevTab={setPrevTab} search={search} setSearch={setSearch} />
          <Home switchh={switchh} setSwitchh={setSwitchh} prevTab={prevTab} setPrevTab={setPrevTab} setSearch={setSearch} />
        </div>
      )
    },
    {
      path: "/about",
      element: <><Nav /><About /></>
    },
  ]);
  return (<>
   {!login ? (<LoginPage setLogin={setLogin}/>) : (<div className="app">
  <RouterProvider router={router}>
    </RouterProvider> 
        </div>)}
        </>);
}

export default App;
