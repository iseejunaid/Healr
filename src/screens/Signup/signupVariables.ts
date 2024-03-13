// signupVariables.ts

interface SignupConfig {
    firstName: string;
    lastName: string;
    category: string;
    isIntern: boolean;
    expertise: string;
    expertiseInput: string;
    email: string;
    // phnNumber: string;
  }
  
const signupConfig: SignupConfig = {
    firstName: '',
    lastName: '',
    category: '',
    isIntern: false,
    expertise: '',
    expertiseInput: '',
    email: '',
    // phnNumber: '',
};

export { signupConfig };
  