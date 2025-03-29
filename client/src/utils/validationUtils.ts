import { useState } from "react";
import * as yup from "yup";
import { object, string } from "yup";

let userSchema = object({
  name: string().required("Name is required"),
  pass: string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

let authorSchema = object({
  name: string().required("Name is required"),
});

// ----validation registration
export const validationUtils = async (name: string, pass: string) => {
  try {
    await userSchema.validate({ name, pass }, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      // .inner в yup.ValidationError — это массив всех ошибок валидации,
      //  возникающих при использовании { abortEarly: false }.
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

// ----validation author name
export const validationName = async (name: string) => {
  try {
    await authorSchema.validate({ name });
    return { isValid: true, error: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const error: { [key: string]: string } = {};
      if (err.path) {
        error[err.path] = err.message;
      }
      return { isValid: false, error: error };
    }
  }
  return { isValid: false, error: {} };
};
// export const validationAuthor = async (name: string) => {
//   try {
//     await authorSchema.validate({ name });
//     return { isValid: true, error: {} };
//   } catch (err) {
//     if (err instanceof yup.ValidationError) {
//       const error: { [key: string]: string } = {};
//       if (err.path) {
//         error[err.path] = err.message;
//       }
//       return { isValid: false, error: error };
//     }
//   }
//   return { isValid: false, error: {} };
// };
