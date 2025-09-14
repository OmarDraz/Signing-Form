export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (userData: SignupData) => Promise<AuthResponse>;
  signin: (credentials: SigninData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<User>;
}
