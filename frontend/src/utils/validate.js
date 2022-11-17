//validation Rules
export const validationRules = () => {
    // let passwordValidation = {
    //   format: {
    //     pattern:
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_#%*?&])[A-Za-z\d@_#$!%*?&]*$/,
    //     flags: "i",
    //     message:
    //       "^Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    //   },
    //   length: {
    //     minimum: 7,
    //     tooShort: "must contain alteast 7 character",
    //   },
    // };
    return {
        email: {
        presence: {
          allowEmpty: false,
          message: "^Email is required",
        },
  
        format: {
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          flags: "i",
          message: "^Email id is incorrect",
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: "^Password is required",
        },
      },
    };
  };


//Register validation
export const RegisterValidation = () => {
    return {
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name is required",
        },
      },
        email: {
        presence: {
          allowEmpty: false,
          message: "^Email is required",
        },
  
        format: {
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          flags: "i",
          message: "^Email id is incorrect",
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: "^Password is required",
        },
      },
    };
  };