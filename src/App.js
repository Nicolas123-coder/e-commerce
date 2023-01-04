import Home from './routes/home/home';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation';
import Authentication from './routes/authentication/authentication';

const Shop = () => {
  return (<h1>Shop</h1>)
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={ <Home /> } />        {/*Atributo index serve pra especificar que é a home quando n tem mais nada na rota*/}
        <Route path='/shop' element={ <Shop /> } />
        <Route path='/auth' element={ <Authentication /> } />
      </Route>
    </Routes>
  )
}

export default App;
