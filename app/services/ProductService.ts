import axios from 'axios';

const API_BASE_URL = 'https://66ea84d455ad32cda4793809.mockapi.io';

// Define TypeScript interfaces for better type safety
interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Helper function for error handling
const handleError = (error: any, defaultMessage: string): string => {
  return error.response
    ? error.response.data?.message || defaultMessage
    : 'Network error or server not reachable';
};

// Function to fetch the list of products
export const fetchProducts = async (page = 1, limit = 10): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: {
        page,
        limit,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, 'Fetching products failed'),
    };
  }
};

// Function to add a new product
export const addProduct = async (productData: Product): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, 'Adding product failed'),
    };
  }
};

// Function to update an existing product
export const updateProduct = async (id: string, updatedData: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, 'Updating product failed'),
    };
  }
};

// Function to delete a product
export const deleteProduct = async (id: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error, 'Deleting product failed'),
    };
  }
};
