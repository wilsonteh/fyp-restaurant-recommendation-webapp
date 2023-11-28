// all auth errors docs 
// https://firebase.google.com/docs/reference/js/auth#autherrorcodes

export function getAuthErrorMessage(errorCode: string) {
  let errorMsg = "Something went wrong";
  
  if (errorCode === "auth/email-already-in-use") 
    errorMsg = "Email already in use, login instead";
  
  else if (errorCode === "auth/user-not-found") 
    errorMsg = "Email does not exist, please sign up for an account";

  else if (errorCode === "auth/invalid-email") 
    errorMsg = "Invalid email";
  
  else if (errorCode === "auth/wrong-password") 
    errorMsg = "Wrong password, please try again";

  else if (errorCode === "auth/too-many-requests") 
    errorMsg = "Too many attempts, please try again later";

  return errorMsg;

}