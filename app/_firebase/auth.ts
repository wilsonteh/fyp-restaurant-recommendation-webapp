import { getAuth } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const isAuthenticated = async () => {
  const user = auth.currentUser;
  console.log(user)
  return user ? true : false;
};

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};

