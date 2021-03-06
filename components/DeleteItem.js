import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { ALL_ITEMS_QUERY } from './Items';
import { PAGINATION_QUERY } from './Pagination';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // Manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // 3. Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[
          { query: PAGINATION_QUERY },
        ]}
        update={this.update}
      >
        {deleteItem => (
          <button
            type="button"
            onClick={async () => {
              if (confirm('Are you sure you want to delete this item?')) {
                await deleteItem().catch(err => {
                  alert(err.message);
                });
                Router.push({
                  pathname: '/',
                });
              }
            }}
          >{this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
