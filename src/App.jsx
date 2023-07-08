import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { Drawer } from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { AppContext } from './context/appContext';
import { Orders } from './pages/Orders';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*fetch('https://64a4604ac3b509573b5773fe.mockapi.io/items')
      .then(res => res.json())
      .then(json => {
        setItems(json);
      });*/

    async function fetchData() {
      try {
        setIsLoading(true);
        // Для правильной работы запросы в следующей последовательности
        // 1 запрос должен быть
        const cartResponse = await axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/cart');

        // 2 запрос должен быть
        // адрес favorites недоступен из-за ограничения сервера, необходимо доплачивать
        /* const favoriteResponse = await axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/favorites');*/

        // 3 запрос должен быть
        const itemsResponse = await axios('https://64a4604ac3b509573b5773fe.mockapi.io/items');

        setIsLoading(false);

        // Аналогичная последовательность
        setCartItems(cartResponse.data);
        // setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async obj => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://64a4604ac3b509573b5773fe.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prevState => [...prevState, obj]);
        const { data } = await axios.post('https://64a4604ac3b509573b5773fe.mockapi.io/cart', obj);
        setCartItems(prevState =>
          prevState.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не удалось добавить товар в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = id => {
    try {
      axios.delete(`https://64a4604ac3b509573b5773fe.mockapi.io/cart/${id}`);
      setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64a4604ac3b509573b5773fe.mockapi.io/favorites/${obj.id}`);
        // setFavorites(prevState => prevState.filter(item => item.id !== obj.id));

        setFavorites(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://64a4604ac3b509573b5773fe.mockapi.io/favorites',
          obj,
        );
        setFavorites(prevState => [...prevState, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
      console.error(error);
    }
  };

  const onChangeSearchInput = event => {
    event.preventDefault();

    setSearchValue(event.target.value);
  };

  const isItemAdded = id => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path={'/'}
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path={'/favorites'} exact element={<Favorites />} />
          <Route path={'/orders'} exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
