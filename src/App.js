import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import { Drawer } from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';

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
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://64a4604ac3b509573b5773fe.mockapi.io/items')
      .then(res => res.json())
      .then(json => {
        setItems(json);
      });
  }, []);

  const onAddToCart = obj => {
    setCartItems(prevState => [...prevState, obj]);
  };

  const onChangeSearchInput = event => {
    event.preventDefault();

    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className={'clear cu-p'}
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={() => setSearchValue('')}
              />
            )}
            <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toLowerCase().includes(searchValue))
            .map(item => (
              <Card
                key={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={obj => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default App;
