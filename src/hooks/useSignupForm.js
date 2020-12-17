import { useState, useEffect } from "react";

const useSignupForm = (callback, validateSignup) => {
  // Signup state
  const [signupValues, setSignupValues] = useState({
    signupUsername: "",
    signupEmail: "",
    signupPassword: "",
  });
  // Signup errors state
  const [signupErrors, setSignupErrors] = useState({});
  // IsSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setSignupErrors(validateSignup(signupValues));

    setIsSubmitting(true);
  };

  useEffect(() => {
    //   Check if no errors
    if (Object.keys(signupErrors).length === 0 && isSubmitting) {
      callback();
    }
  }, [signupErrors]);

  return {
    signupValues,
    handleSignupChange,
    handleSignupSubmit,
    signupErrors,
  };
};

export default useSignupForm;
