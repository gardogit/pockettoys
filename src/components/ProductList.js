import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commerce from '../commerce';
import { CartContext } from '../CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, fetchCart } = useContext(CartContext);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts(response.data);
  };

  const handleAddToCart = async (productId) => {
    const response = await addToCart(productId, 1);
    if (response) {
      fetchCart();
    }
  };  

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
                <img src={product.image.url} alt={product.name} />
                <Link to={`/product/${product.id}`}><h2>{product.name}</h2></Link>
              <p>{product.price.formatted_with_symbol}</p>
              <button onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
