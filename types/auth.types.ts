export interface SigninValues {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setRole: (role: string) => void;
  role: string | null;
}

export interface Role {
  role: string | null;
}

export interface ResponseTokenProps {
  'access-token': string;
}

export interface SignupValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  role: 0;
}

export interface GoogleSignInResponse {
  idToken: string;
  scopes: string[];
  serverAuthCode: string | null;
  user: GoogleUserInfo;
}

export interface GoogleUserInfo {
  email: string;
  familyName: string | null;
  givenName: string;
  id: string;
  name: string;
  photo: string;
}
