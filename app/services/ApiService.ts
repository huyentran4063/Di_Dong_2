import axios from 'axios';

const API_BASE_URL = 'https://66ea84d455ad32cda4793809.mockapi.io';

// Function to register the user
export const registerUser = async (userData: {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    // Send userData as JSON to MockAPI
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response.data?.message || 'Registration failed'
      : 'Network error or server not reachable';
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Function to log in the user
export const loginUser = async (username: string, password: string) => {
  try {
    // Fetch all registered users from MockAPI
    const response = await axios.get(`${API_BASE_URL}/users`);

    // Check if there's a user with the matching username and password
    const user = response.data.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      return {
        success: true,
        data: user,
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password.',
      };
    }
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response.data?.message || 'Login failed'
      : 'Network error or server not reachable';
    return {
      success: false,
      message: errorMessage,
    };
  }
};

