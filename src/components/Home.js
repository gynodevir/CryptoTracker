// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Coin from './Coin';


const Home = ({setSymbol}) => {
  const navigate = useNavigate();

  const tradingPage = (symbol) => {
    setSymbol(symbol)
    
    navigate('/trading');
  };

  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
      .then((response) => {
        const data = response.data;
        console.log(data);
        setCoin(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };



  const filteredCoins = coin.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a coin</h1>
        <form>
          <input
            type='text'
            className='coin-input'
            placeholder='Search . . .'
            onChange={handleChange}
          />
        </form>
      </div>
       {filteredCoins.map((coin) => {
        return (
          <div key={coin.id} onClick={()=>tradingPage(coin.symbol)}>
            
            <Coin
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          </div>
        );
      })} 
      
    </div>
  );
};

export default Home;
