export const getErrorMessage = (err, defaultMessage = 'An error occurred. Please try again.') => {
  if (!err) return defaultMessage;
  
  if (err.response && err.response.data) {
    const data = err.response.data;
    
    // If it's a simple string error
    if (typeof data.error === 'string') return data.error;
    if (typeof data.detail === 'string') return data.detail;
    if (typeof data.message === 'string') return data.message;
    
    // If it's an array of non_field_errors
    if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
      return data.non_field_errors[0];
    }

    // Handle field-specific validation errors from Django Rest Framework
    // Looks for the first field that has an error array
    const keys = Object.keys(data);
    if (keys.length > 0) {
      for (const key of keys) {
        const errorMsg = data[key];
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        if (Array.isArray(errorMsg) && errorMsg.length > 0) {
          // E.g., "Password: This password is too common."
          return `${formattedKey}: ${errorMsg[0]}`;
        } else if (typeof errorMsg === 'string') {
          return `${formattedKey}: ${errorMsg}`;
        }
      }
    }
  }
  
  return err.message || defaultMessage;
};
