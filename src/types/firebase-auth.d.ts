import type { Auth, UserCredential } from "@firebase/auth-types";

declare module "firebase/auth" {
  export type { Auth, UserCredential };

  export function getAuth(app?: any): Auth;
  export function signInWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential>;
  export function createUserWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential>;
  export function signOut(auth: Auth): Promise<void>;
}
