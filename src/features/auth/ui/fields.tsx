import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useId } from "react";

type AuthFieldsProps = {
  login: string;
  password: string;
  onChangeLogin: (login: string) => void;
  onChangePassword: (login: string) => void;
};

export function AuthFields({
  login,
  password,
  onChangeLogin,
  onChangePassword,
}: AuthFieldsProps) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="login"
          placeholder="Enter your login"
          value={login}
          onChange={(e) => onChangeLogin(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          required
        />
      </div>
    </>
  );
}
