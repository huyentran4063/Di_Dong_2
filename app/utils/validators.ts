// Một thư mục tiện ích cho các trình trợ giúp như trình xác thực, trình trợ giúp API, v.v.

export interface ValidationErrors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateEmail = (email: string): boolean | null => {
    if (email === '') return null;
    // Regex to match only Gmail addresses
    return /^[\w.-]+@gmail\.com$/.test(email);
  };
  
  export const validatePhone = (phone: string): boolean => {
    // Phone number should start with '0' and be followed by exactly 10 digits
    return /^0\d{9}$/.test(phone);
  };
  
  export const validatePassword = (password: string): boolean => {
    // Password should be at least 8 characters long and include letters, numbers, and special characters
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };
  
  export const validateInputs = (
    isSignUp: boolean,
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  ): { isValid: boolean; errors: ValidationErrors } => {
    let isValid = true;
    const errors: ValidationErrors = {};
  
    if (isSignUp) {
      if (!name) {
        errors.name = 'Name is required.';
        isValid = false;
      }
      if (!username.trim()) {
        errors.username = 'Username is required.';
        isValid = false;
      }
      if (!email.trim()) {
        errors.email = 'Email is required.';
        isValid = false;
      } else if (!validateEmail(email)) {
        errors.email = 'Email must be a Gmail address.';
        isValid = false;
      }
      if (!phone) {
        errors.phone = 'Phone number is required.';
        isValid = false;
      } else if (!validatePhone(phone)) {
        errors.phone = 'Phone number must start with 0 and have exactly 10 digits.';
        isValid = false;
      }
      if (!password) {
        errors.password = 'Password is required.';
        isValid = false;
      } else if (!validatePassword(password)) {
        errors.password = 'Password must be at least 8 characters long and include letters, numbers, and special characters.';
        isValid = false;
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
        isValid = false;
      }
    } else {
      if (!username.trim()) {
        errors.username = 'Username is required.';
        isValid = false;
      }
      if (!password) {
        errors.password = 'Password is required.';
        isValid = false;
      } else if (!validatePassword(password)) {
        errors.password = 'Incorrect password';
        isValid = false;
      }
    }
  
    return { isValid, errors };
  };
  