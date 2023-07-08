import { Card } from '../components/Card/Card';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/appContext';

export const Orders = () => {
  const { onAddToCart, onAddToFavorite } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Доплатить за сервер
        const { data } = await axios.get('https://64a4604ac3b509573b5773fe.mockapi.io/orders');
        // 2 варианта получения из 2-х массивов один массив
        // setOrders(data.map(obj => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
