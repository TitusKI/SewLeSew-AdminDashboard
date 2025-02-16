export const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
export const isValidPhone = (value) => /^(\+251|0)[1-9]\d{8}$/.test(value);
