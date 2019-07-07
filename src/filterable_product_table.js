import React from 'react';

export default function FilterableProductTable(props) {
    console.log(props.products);
    return (
        <div>
            <SearchBar />
            <ProductTable products={props.products}/>
        </div>
    );
}

function SearchBar() {
    return (
        <form>
            <input type="text" placeholder="Search..." />
            <p>
                <input type="checkbox" />
                {' '}
                Only show products in stock
            </p>
      </form>
    );
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
