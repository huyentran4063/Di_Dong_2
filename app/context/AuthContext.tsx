import React, { createContext, useState, useEffect } from 'react';

// Định nghĩa kiểu cho context
interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, email: string) => Promise<void>;
}

// Tạo context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Khi component được mount, kiểm tra trạng thái đăng nhập từ localStorage
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Giả sử bạn có một hàm API để đăng nhập
      await loginUser(username, password); // Cần định nghĩa hàm này
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập vào localStorage
    } catch (error) {
      console.error('Login failed:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Xóa trạng thái đăng nhập khỏi localStorage
    // Thực hiện bất kỳ công việc dọn dẹp nào, như xóa token
  };

  const register = async (username: string, password: string, email: string) => {
    try {
      await registerUser(username, password, email); // Cần định nghĩa hàm này
      await login(username, password); // Đăng nhập ngay sau khi đăng ký
    } catch (error) {
      console.error('Registration failed:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hàm đăng nhập giả định
const loginUser = async (username: string, password: string) => {
  // Thực hiện logic gọi API để đăng nhập
};

// Hàm đăng ký giả định
const registerUser = async (username: string, password: string, email: string) => {
  // Thực hiện logic gọi API để đăng ký
};
