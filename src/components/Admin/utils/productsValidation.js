export const validateForm = (formData, errors) => {
    Object.keys(errors).forEach((key) => (errors[key] = ""));
    
    // Product name validation
    if (!formData.name) {
      errors.name = "Product name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Product name must be at least 3 characters";
    }
  
    // Description validation
    if (!formData.description) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
  
    // Price validation
    if (!formData.price) {
      errors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
  
    // Original price validation
    if (!formData.originalPrice) {
      errors.originalPrice = "Original price is required";
    } else if (Number(formData.originalPrice) < Number(formData.price)) {
      errors.originalPrice = "Original price cannot be less than current price";
    }
  
    // Tags validation
    if (!formData.tags) {
      errors.tags = "Tags are required";
    } else if (formData.tags.split(',').filter(tag => tag.trim()).length === 0) {
      errors.tags = "At least one valid tag is required";
    }
  
    // Category validation
    if (!formData.category) {
      errors.category = "Category is required";
    }
  
    // Check if any errors exist
    return !Object.values(errors).some((error) => error !== "");
  };