import { Button } from "@/ui/Button";
import { Input } from "@/ui/RHFInput";
import { Typography } from "@/ui/Typography";

export const LoginPage = () => {
  return (
    <div className="form">
      <Typography variant="h3">Login</Typography>
      <form>
        <Input label="Username" placeholder="username ..." />
        <Input label="Password" placeholder="password ..." />
        <Button>Login</Button>
      </form>
    </div>
  );
};
