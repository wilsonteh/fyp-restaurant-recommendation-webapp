import { toast } from "react-hot-toast";

export const signinToast = (
  promise: Promise<any>, 
  status: 'success' | 'error', 
  message?: string
) => {
  
  toast.promise(promise, {
    loading: 'Loading...', 
    success: message || 'Login successful',
    error: message || 'Login failed'
  })

}