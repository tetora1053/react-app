import React from 'react';
import ReactDOM from 'react-dom';
import ChildComponent from './filterable_product_table';

class ParentComponent extends React.Component {
  render() {

    const PRODUCTS = [
      {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
      {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
      {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
      {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
      {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
      {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
    ];

    return (
      <div>
        <ChildComponent products={PRODUCTS}/>
      </div>
    )
  }
}

ReactDOM.render(
  <ParentComponent/>,
  document.getElementById('root')
);