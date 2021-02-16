export default function validateSignup(values) {
  let errors = {};
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //   Validate username
  if (!values.signupUsername) {
    errors.signupUsername = "Please enter a username";
  }

  // Validate email
  if (!values.signupEmail) {
    errors.signupEmail = "Please enter a email address";
  } else if (!values.signupEmail.match(mailformat)) {
    console.log("error");
    errors.signupEmail = "Email address is invalid";
  }

  //   Validate password
  if (!values.signupPassword) {
    errors.signupPassword = "Please enter a password";
  } else if (values.signupPassword.length < 6) {
    errors.signupPassword = "Password needs to be atleast 6 characters";
  }

  return errors;
}
