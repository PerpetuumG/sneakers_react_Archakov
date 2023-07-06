import styles from './Card.module.scss';
import { useState } from 'react';

export const Card = ({ id, imageUrl, title, price, onPlus, onFavorite, favorited = false }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ imageUrl, title, price });
    setIsAdded(!isAdded);
  };
  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.favorite}
        src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
        alt="Unliked"
        onClick={onClickFavorite}
      />
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>${price}</b>
        </div>
        <img
          className={styles.plus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
};
