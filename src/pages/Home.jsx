import { Card } from '../components/Card/Card';

export const Home = ({
  items,
  onAddToCart,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
}) => {
  return (
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
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map(item => (
            <Card
              key={item.id}
              onFavorite={obj => onAddToFavorite(obj)}
              onPlus={obj => onAddToCart(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
};
