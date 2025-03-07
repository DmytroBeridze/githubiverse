import { useState } from "react";
import * as yup from "yup";
import { object, string } from "yup";

let userSchema = object({
  name: string().required("Name is required"),
  pass: string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

const validationUtils = async (name: string, pass: string) => {
  try {
    await userSchema.validate({ name, pass }, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      return { isValid: false, errors };
    }
  }
  return { isValid: false, errors: {} };
};
export default validationUtils;
