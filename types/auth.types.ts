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
  'full-name': string;
  password: string;
  'confirm-password': string;
  role: number;
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
  gender: number;
}

export interface EditInfo {
  'account-id': number;
  'avatar-url': string;
  'full-name': 'Dương Tôn Bảo';
  'phone-number': '0909113114';
  dob: Date | string | undefined;
  gender: number;
  address: 'Chưa cập nhật';
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
  logout(): unknown;
  fcmToken: string | null;
  setFcmToken: (fcmToken: string) => void;
  isAuthenticated: boolean;
  role: string | null;
  setRole: (role: string) => void;
  login: (method: 'google' | 'normal') => void;
  logoutGoogle: () => Promise<void>;
  logoutNormal: () => Promise<void>;
  loginMethod: 'google' | 'normal' | null;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
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

export interface OtpValues {
  email: string;
  'otp-code': string;
}

export interface FcmValues {
  email: string;
  'fcm-token': string;
}
