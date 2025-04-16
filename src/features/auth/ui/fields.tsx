import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useId } from "react";

type AuthFieldsProps = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
};

export function AuthFields({ formData, errors }: AuthFieldsProps) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          defaultValue={formData?.get("login")?.toString()}
          type="login"
          name="login"
          placeholder="Enter your login"
          required
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          defaultValue={formData?.get("password")?.toString()}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
