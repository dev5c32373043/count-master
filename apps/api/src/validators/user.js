export const validateEmail = val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);

export const validatePassword = val => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val);
