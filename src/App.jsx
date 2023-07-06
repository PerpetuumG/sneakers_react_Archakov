import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Drawer } from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';

/*const arr = [
  {
    id: 1,
    imageUrl: '/img/sneakers/1.jpg',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
  },
  {
    id: 2,
    imageUrl: '/img/sneakers/2.jpg',
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
  },
  {
    id: 3,
    imageUrl: '/img/sneakers/3.jpg',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
  },
  {
    id: 4,
    imageUrl: '/img/sneakers/4.jpg',
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
  },
  {
    id: 5,
    imageUrl: '/img/sneakers/5.jpg',
    title: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
  },
  {
    id: 6,
    imageUrl: '/img/sneakers/6.jpg',
    title: 'Мужские Кроссовки Nike Kyrie 7',
    price: 11299,
  },
  {
    id: 7,
    imageUrl: '/img/sneakers/7.jpg',
    title: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 10799,
  },
  {
    id: 8,
    imageUrl: '/img/sneakers/8.jpg',
    title: 'Мужские Кроссовки Nike LeBron XVIII',
    price: 16499,
  },
  {
    id: 9,
    imageUrl: '/img/sneakers/9.jpg',
    title: 'Мужские Кроссовки Nike Lebron XVIII Low',
    price: 13999,
  },
  {
    id: 10,
    imageUrl: '/img/sneakers/10.jpg',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
  },
  {
    id: 11,
    imageUrl: '/img/sneakers/11.jpg',
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
  },
  {
    id: 12,
    imageUrl: '/img/sneakers/12.jpg',
    title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
    price: 11299,
  },
];*/

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    /*fetch('https://64a4604ac3b509573b5773fe.mockapi.io/items')
      .then(res => res.json())
      .then(json => {
        setItems(json);
      });*/

    axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/items').then(res => {
      setItems(res.data);
    });
    axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });

    // адрес favorites недоступен из-за ограничения сервера, необходимо доплачивать
    /*axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/favorites').then(res => {
      setFavorites(res.data);
    });*/
  }, []);

  const onAddToCart = obj => {
    axios.post('https://64a4604ac3b509573b5773fe.mockapi.io/cart', obj);

    setCartItems(prevState => [...prevState, obj]);
  };

  const onRemoveItem = id => {
    axios.delete(`https://64a4604ac3b509573b5773fe.mockapi.io/cart/:{id}`);
    setCartItems(prevState => prevState.filter(item => item.id !== id));
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://64a4604ac3b509573b5773fe.mockapi.io/favorites/:{obj.id}`);
        // setFavorites(prevState => prevState.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://64a4604ac3b509573b5773fe.mockapi.io/favorites',
          obj,
        );
        setFavorites(prevState => [...prevState, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = event => {
    event.preventDefault();

    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path={'/'}
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
        <Route
          path={'/favorites'}
          exact
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
        />
      </Routes>
    </div>
  );
}
export default App;
