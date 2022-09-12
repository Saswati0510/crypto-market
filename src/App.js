
import './App.css';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './routes/Home'
import CoinPage from './routes/CoinPage'
import SignUp from './routes/SignUp'
import SignIn from './routes/SignIn'
import Account from './routes/Account'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import AuthContext from './context/AuthContext';

function App() {
  const [coins, setCoins] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect(() => {
    axios.get(url).then((response) => {
      /*  console.log(response) */
      setCoins(response.data)
    })
  }, [url]);
  return (
    <AuthContext>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home coins={coins}></Home>} exact></Route>
          <Route path='/coin/:coinId' element={<CoinPage></CoinPage>} exact></Route>
          <Route path='/signup' element={<SignUp></SignUp>} exact></Route>
          <Route path='/signin' element={<SignIn></SignIn>} exact></Route>
          <Route path='/account' element={<Account></Account>} exact></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </AuthContext>

  );
}

export default App;
