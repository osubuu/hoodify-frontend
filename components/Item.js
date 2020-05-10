import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

const Item = props => {
  const { item, me } = props;
  return (
    <ItemStyles>
      {item.image && (
      <img
        src={item.image}
        alt={item.title}
        onClick={() => Router.push({
          pathname: '/item',
          query: { id: item.id },
        })}
      />
      )}
      <Title>
        <Link href={{
          pathname: '/item',
          query: { id: item.id },
        }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>

      <div className="buttonList">
        {me && (
        <Link href={{
          pathname: 'update',
          query: { id: item.id },
        }}
        >
          <a>Edit</a>
        </Link>
        )}
        <AddToCart id={item.id} />
        {me && <DeleteItem id={item.id}>Delete This Item</DeleteItem>}
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Item;
