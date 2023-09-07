import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const signUpWithPassword = async (email: string, password: string) => {
  try  {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    console.log(user);
    
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error("ERROR SIGNING UP WITH EMAIL AND PASSWORD")
    console.log(errorCode, errorMessage);
  }
};

export const signInWithPassword = async (email: string, password: string) => {
  let errorCode = "", errorMsg = ""; 
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
  } catch (err: any) {
    errorCode = err.code;
    console.error("ERROR SIGNING IN WITH EMAIL AND PASSWORD")
    console.log(errorCode, err.message);
    
    if (errorCode === "auth/wrong-password") {
      errorMsg = "Incorrect email or password"
    } else if (errorCode === "auth/user-not-found") {
      errorMsg = "Email does not exist, please register"
    }
  }

  return { errorCode, errorMsg };

}

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
};

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};

