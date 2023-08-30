import { Button } from "@nextui-org/button";

interface AuthButtonProps {
  authMethod: string;
  onPress: () => void;
}
 
const AuthButton = ({ authMethod, onPress }: AuthButtonProps) => {

  // props: 
  // login method: google, github, 
  // styling: 

  return (
    <Button color="secondary" onPress={onPress} className="capitalize">
      { authMethod } 
    </Button>
  );
}
 
export default AuthButton;