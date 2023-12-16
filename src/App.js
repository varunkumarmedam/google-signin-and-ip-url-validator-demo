import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { Client, Account } from "appwrite";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLogged, setIsLogged] = useState(false); // Check if the user is logged or not
  const [isLoading, setIsLoading] = useState(true); // Checks Appwrite Auth API status to show loading 
  const [userData, setUserData] = useState({}); // Stores user data if logged

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // API Endpoint
    .setProject('dummy');
  const account = new Account(client);

  useEffect(() => {
    // Check if the user is logged
    // This will be called everytime if the page is refreshed and validate current user session
    account.get()
      .then((user) => { setUserData(user); setIsLogged(true) })
      .catch((_) => { setIsLogged(false) })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <ToastContainer />

      {/* Dynamically loads the component based on user current session */}
      {isLoading ?
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        : isLogged
          ? <Home user={userData} logout={() => account.deleteSessions().then((_) => setIsLogged(false))} />
          : <Login />
      }

    </div>
  );
}

export default App;
