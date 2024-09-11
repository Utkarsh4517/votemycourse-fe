import User from "./users";

interface AuthResponse {
    token: string;
    user: User;
  }

  export default AuthResponse;