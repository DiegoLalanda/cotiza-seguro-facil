export interface LoginResponse {
  access_token: string;
  admin: {
    id: number;
    username: string;
    email: string;
  };
}