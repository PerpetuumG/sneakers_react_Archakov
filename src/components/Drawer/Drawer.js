import axios from 'axios';
import styles from './Drawer.module.scss';
import { Info } from '../Info/Info';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const Drawer = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      // Необходимо доплатить за сервер
      /*
       const {data} = await axios.post('https://64a4604ac3b509573b5773fe.mockapi.io/orders', {
       items: cartItems
       });
       */
      // setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      // Удаление всех элементов корзины
      // Костыль
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://64a4604ac3b509573b5773fe.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img className="cu-p" src="/img/btn-remove.svg" alt="Close" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <div className={'d-flex flex-column flex'}>
            <div className={'items flex'}>
              {items.map(obj => (
                <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>$ {obj.price}</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>

            <div className={'cartTotalBlock'}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>${totalPrice}</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>${((totalPrice / 100) * 5).toFixed(2)}</b>
                </li>
              </ul>
              <button className={'greenButton'} onClick={onClickOrder} disabled={isLoading}>
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
            }
          />
        )}
      </div>
    </div>
  );
};
