import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import commerce from '../commerce';
import { CartContext } from '../CartContext';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await commerce.products.retrieve(productId);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={product.image.url} alt={product.name} />
      <h1>{product.name}</h1>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <p>Price: {product.price.formatted_with_symbol}</p>
      <button onClick={() => addToCart(product.id, 1)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductDetail;
