import styles from './Drawer.module.scss';

export const Drawer = ({ onClose, items = [] }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img className="cu-p" src="/img/btn-remove.svg" alt="Close" onClick={onClose} />
        </h2>

        <div className={'items'}>
          {items.map(obj => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              ></div>

              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>$ {obj.price}</b>
              </div>
              <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
          ))}
        </div>

        <div className={'cartTotalBlock'}>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>$21 498</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>$1074</b>
            </li>
          </ul>
          <button className={'greenButton'}>
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
