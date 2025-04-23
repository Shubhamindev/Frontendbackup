export const firstPageFormConfig = {
  fields: {
    arn: {
      label: "IAM Role ARN",
      placeholder: "e.g. arn:aws:iam::123456789012:role/MyRole",
      required: true,
      pattern: /^arn:aws:iam::\d{12}:role\/[a-zA-Z0-9+=,.@_-]+$/,
      errorMessage: "Please enter a valid IAM Role ARN (e.g., arn:aws:iam::123456789012:role/MyRole)"
    },
    accountName: {
      label: "Account Name",
      placeholder: "Enter AWS Account Name",
      required: true,
      pattern: /^[a-zA-Z0-9\s-_]+$/,
      errorMessage: "Account name can only contain letters, numbers, spaces, hyphens, and underscores"
    },
    accountID: {
      label: "Account ID",
      placeholder: "Enter Account ID",
      required: true,
      pattern: /^\d{12}$/,
      errorMessage: "AWS Account ID must be exactly 12 digits"
    },
    region: {
      label: "Region",
      placeholder: "us-east-1",
      required: true,
      pattern: /^[a-z]{2}-[a-z]+-\d$/,
      errorMessage: "Please enter a valid AWS region (e.g., us-east-1)"
    }
  }
};

// Validation functions
export const validateField = (field, value, config) => {
  if (config.required && !value) {
    return "This field is required";
  }
  if (config.pattern && value && !config.pattern.test(value)) {
    return config.errorMessage;
  }
  return "";
};

export const validateForm = (formData, config) => {
  const errors = {};
  let isValid = true;

  Object.keys(config.fields).forEach((field) => {
    const fieldConfig = config.fields[field];
    const error = validateField(field, formData[field], fieldConfig);
    
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};