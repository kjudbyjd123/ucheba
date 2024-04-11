import React from 'react';
import './Product.css';

function Product ({images, header, price, _id}) {
    return (
        <div className="Product">
            <img alt='Товар' src={images} />
            <h1>{header}</h1>
            <p>{ ` ${price} руб.`}</p>
            <button>В корзину</button>
        </div>
    );
}

export default Product;
