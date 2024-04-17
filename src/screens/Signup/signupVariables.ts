// signupVariables.ts

interface SignupConfig {
    firstName: string;
    lastName: string;
    category: string;
    expertise: string;
    expertiseInput: string;
    email: string;
    phnNumber: string;
  }
  
const signupConfig: SignupConfig = {
    firstName: '',
    lastName: '',
    category: '',
    expertise: '',
    expertiseInput: '',
    email: '',
    phnNumber: '',
};

export { signupConfig };
  