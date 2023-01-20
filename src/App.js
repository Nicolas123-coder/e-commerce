import Home from './routes/home/home';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/shop/shop';
import Checkout from './routes/checkout/checkout';
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase";
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user)
        }
        dispatch(setCurrentUser(user))
    })

    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={ <Home /> } />        {/*Atributo index serve pra especificar que é a home quando n tem mais nada na rota*/}
        <Route path='shop/*' element={ <Shop /> } />
        <Route path='auth' element={ <Authentication /> } />
        <Route path='checkout' element={ <Checkout /> } />
      </Route>
    </Routes>
  )
}

export default App;
