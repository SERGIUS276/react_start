import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './Context';
import AppRouter from './components/UI/AppRouter';
import {useState, useEffect} from 'react'; 


function App (){
  const[isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
  })

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
