const ROUTES = {
  LOGIN: "Login",
  REGISTER: "Register",
  WELCOME: "Welcome",
  HOME: "Home",
} as const;

export type TRoutes = (typeof ROUTES)[keyof typeof ROUTES];
export default ROUTES;
