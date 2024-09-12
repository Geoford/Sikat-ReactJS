export default function LoginValidation(values) {
  let errors = {};
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

  if (!values.username) {
    errors.username = "Username should not be empty";
  }

  if (!values.password) {
    errors.password = "Password should not be empty";
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, and one digit";
  }

  return errors;
}
