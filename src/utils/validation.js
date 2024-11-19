export const checkoutValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
//   phone: {
//     pattern: /^\+?[1-9]\d{1,14}$/,
//     message: "Please enter a valid phone number",
//   },
//   zipCode: {
//     pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
//     message: "Please enter a valid ZIP code",
//   },
};

export const validateCheckout = (formData) => {
  const errors = {};

  const requiredFields = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone number",
    shippingAddress: "Shipping address",
    country: "Country",
    state: "State",
    city: "City",
    zipCode: "ZIP code",
  };

  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!formData[field]) {
      errors[field] = `${label} is required`;
    }
  });

//   if (formData.email && !checkoutValidationRules.email.pattern.test(formData.email)) {
//     errors.email = checkoutValidationRules.email.message;
//   }

//   if (formData.phone && !checkoutValidationRules.phone.pattern.test(formData.phone)) {
//     errors.phone = checkoutValidationRules.phone.message;
//   }

//   if (formData.zipCode && !checkoutValidationRules.zipCode.pattern.test(formData.zipCode)) {
//     errors.zipCode = checkoutValidationRules.zipCode.message;
//   }

  Object.entries(checkoutValidationRules).forEach(([field, rule]) => {
    if (formData[field] && !rule.pattern.test(formData[field].trim())) {
      errors[field] = rule.message;
    }
  });

  return errors;
};
