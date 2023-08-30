import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    // The email of the user's account used.
    const email = err.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(err);
    console.error("ERROR SIGNING IN WITH GOOGLE")
    console.log(errorCode, errorMessage, email, credential);
  }

}

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
}