import validator from "validator";

export const validateLoginForm = (
  email: string,
  password: string,
  setErrorMessage: any,
): boolean => {
  if (!email || !password) {
    setErrorMessage("Please enter a valid email and password.");
    return false;
  }

  if (!validator.isEmail(email)) {
    setErrorMessage("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const validateSignupForm = (
  email: string,
  password: string,
  confirmPassword: string,
  setErrorMessage: any,
): boolean => {
  if (!email || !password || !confirmPassword) {
    setErrorMessage("Please enter a valid email and password.");
    return false;
  }

  if (confirmPassword !== password) {
    setErrorMessage("Passwords mismatch");
    return false;
  }

  if (!validator.isEmail(email)) {
    setErrorMessage("Please enter a valid email address.");
    return false;
  }

  return true;
};