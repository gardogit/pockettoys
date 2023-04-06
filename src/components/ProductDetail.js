import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import commerce from '../commerce';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  console.log('Product ID:', productId);
  const { addToCart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = async (productId) => {
    console.log('Adding product to cart with ID:', productId, 'and quantity:', quantity);
    try {
      const response = await addToCart(productId, quantity);
      console.log('handleAddToCart response:', response); // Agrega esta línea
      if (response) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error data:", error.data);      
    }
  };  
  
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

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
      <div>
        <label htmlFor="quantity">Cantidad:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
        >
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <option key={value} value={value}>
              {value} unidad{value > 1 ? 'es' : ''}
            </option>
          ))}
        </select>
        <span> (Stock: {product.inventory.available})</span>
      </div>
      <button onClick={() => handleAddToCart(productId)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductDetail;
