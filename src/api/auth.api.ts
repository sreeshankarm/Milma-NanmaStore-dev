// import api from "./axios";

// export interface LoginPayload {
//   login_mobile: string;
//   password: string;
// }

// export const loginService = (payload: LoginPayload) =>
//   api.post("/login", payload);





import api from "./axios";
import type { LoginPayload, LoginResponse } from "../types";
import type { ApiSuccess } from "../types/common";
import type { ChangePasswordPayload } from "../types";

export const loginApi = (payload: LoginPayload) =>
  api.post<LoginResponse>("/login", payload);

export const changePasswordApi = (payload: ChangePasswordPayload) =>
  api.post("/changeauthpassword", payload);

export const logoutApi = () => {
  return api.post<ApiSuccess>("/logout");
};
