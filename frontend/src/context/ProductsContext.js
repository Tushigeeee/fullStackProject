import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
export const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productContextLoading, setProductContextLoading] = useState(true);
  const { currentUser, userContextLoading } = useUserContext();
  useEffect(() => {
    if (!userContextLoading) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8080/products", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          const data = await response.data;
          setProducts(data);
          setProductContextLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        fetchProducts();
      }
      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading]);
  const Create_Product = async (product) => {
    setProducts([...products, product]);
  };
  const Update_Product = async (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
  };
  const Delete_Product = async (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
  };
  return (
    <ProductContext.Provider
      value={{
        productContextLoading,
        products,
        setProducts,
        Create_Product,
        Update_Product,
        Delete_Product,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};
