export interface SigninValues {
  email: string;
  password: string;
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

export interface UserInfo {
  id: number;
  name?: string;
  address?: string;
  'avatar-url'?: string;
  dob?: Date | string;
  email: string;
  role?: number;
  'phone-number': string;
  'full-name': string;
}

export interface UpdateUser {
  'account-id': number;
  address?: string;
  'avatar-url'?: string;
  dob?: Date | string;
  'phone-number': string;
  'full-name': string;
  gender: number;
}

export interface AuthState {
  logoutGoogle: () => Promise<void>;
  fcmToken: string | null;
  setFcmToken: (fcmToken: string) => void;
  isAuthenticated: boolean;
  role: string | null;
  setRole: (role: string) => void;
  login: () => void;
}

export interface GoogleSignInResponse {
  idToken: string | undefined;
  user: GoogleUserInfo;
  scopes: string[];
  serverAuthCode: string | undefined;
}

export interface GoogleUserInfo {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
}
