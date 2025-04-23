const FormConfig = {
  login: {
    title: "Login",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        required: true,
      },
    ],
    submitButton: {
      text: "Login",
    },
  }
};

export default FormConfig;
