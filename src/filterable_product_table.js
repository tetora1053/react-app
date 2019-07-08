import React from 'react';

export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowProductsInStock: false,
        }
        this.SwitchShowProductsInStock = this.SwitchShowProductsInStock.bind(this);
    }

    SwitchShowProductsInStock(e) {
        console.log('checkbox value : ', e.target.checked);
        this.setState({isShowProductsInStock: e.target.checked});
    }

    render() {
        console.log(this.props.products);
        let products = this.props.products;
        if (this.state.isShowProductsInStock) {
            console.log(111);
            products = products.filter((product) => {return product.stocked;});
        }
        return (
            <div>
                <SearchBar switchShowProductsInStock={this.SwitchShowProductsInStock} />
                <ProductTable products={products}/>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <p>
                    <label>
                        <input type="checkbox" onChange={this.props.switchShowProductsInStock}/>
                        {' '}
                        Only show products in stock
                    </label>
                </p>
            </form>
        );
    }
}

function ProductTable(props) {
  const rows = [];
  let lastCategory = null;
  
  props.products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow(props) {
    const category = props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
}

function ProductRow(props) {
    const product = props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
}
