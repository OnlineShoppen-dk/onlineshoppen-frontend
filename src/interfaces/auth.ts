export interface RegisterRequest {
  email: string;
  password: string;
  guid: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfileRequest {
  firstName: string;
  lastName: string;
  guid: string;
  email: string;
  phoneNumber: string;
}

export interface ProfileResponse {
  data: {
    firstName: string;
    lastName: string;
    guid: string;
    email: string;
    phoneNumber: string;
  }

}

export interface AuthResponse {
  data: {
    msg: string;
    user_details: {
      email: string;
      guid: string;
    };
  };
}
