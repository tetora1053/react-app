import React from 'react';

export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyShowProductsInStock: false,
            searchStr: '',
            orderBy: 'name',
            orderMethod: 'asc',
        }
        this.SwitchShowProductsInStock = this.SwitchShowProductsInStock.bind(this);
        this.SearchByName = this.SearchByName.bind(this);
        this.ChangeOrderBy = this.ChangeOrderBy.bind(this);
        this.ChangeOrderMethod = this.ChangeOrderMethod.bind(this);
    }

    SearchByName(e) {
        this.setState({searchStr: e.target.value});
    }

    SwitchShowProductsInStock(e) {
        this.setState({onlyShowProductsInStock: e.target.checked});
    }

    ChangeOrderBy(e) {
      this.setState({orderBy: e.target.value});
    }

    ChangeOrderMethod(e) {
      this.setState({orderMethod: e.target.value});
    }

    render() {
        let products = this.props.products;
        products = products.sort((a, b) => {
          let compare_res = 0;
          if (a.category.toUpperCase() < b.category.toUpperCase()) {
             return -1;
          } else if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return 1;
          } else {
            switch (this.state.orderBy) {
              case 'name':
                if (a.name.toUpperCase() <= b.name.toUpperCase()) {
                  compare_res = -1;
                } else {
                  compare_res = 1;
                }
                break;
              case 'price':
                let price_a = /\$(\d+(?:\.\d+)?)/.exec(a.price);
                price_a = Number(price_a[1]);
                let price_b = /\$(\d+(?:\.\d+)?)/.exec(b.price);
                price_b = Number(price_b[1]);
                if (price_a < price_b) {
                  compare_res = -1;
                } else if (price_a > price_b) {
                  compare_res = 1;
                }
                break;
            }
          }
          return (this.state.orderMethod === 'asc') ? compare_res : compare_res * -1;
        });

        if (this.state.onlyShowProductsInStock) {
            products = products.filter((product) => {return product.stocked;});
        }
        if (this.state.searchStr !== '') {
            products = products.filter((product) => {
                console.log(product.name);
                if (product.name.toUpperCase().indexOf(this.state.searchStr.toUpperCase()) === 0) {
                    return true;
                }
            });
        }
        return (
            <div>
                <SearchBar
                  searchByName={this.SearchByName}
                  switchShowProductsInStock={this.SwitchShowProductsInStock}
                  changeOrderBy={this.ChangeOrderBy}
                  changeOrderMethod={this.ChangeOrderMethod}
                />
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
                <input type="text" placeholder="Search..." onChange={this.props.searchByName}/>
                <p>
                    <label>
                        <input type="checkbox" onChange={this.props.switchShowProductsInStock}/>
                        &nbsp;
                        Only show products in stock
                    </label>
                </p>
                <select onChange={this.props.changeOrderBy}>
                  <option value="name">商品名</option>
                  <option value="price">価格</option>
                </select>&nbsp;
                <select onChange={this.props.changeOrderMethod}>
                  <option value="asc">昇順</option>
                  <option value="desc">降順</option>
                </select>
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
