"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

import { right } from "@/shared/lib/either";
import { toast } from "sonner";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";

// const formSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   password: z.string().min(1, { message: "Password is required" }),
// });

export function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  async function handleSumbit() {
    setIsLoading(true);
    try {
      // Here you would typically call your authentication API
      // For example: await signIn(values.email, values.password)

      toast.success("Success!", {
        description: "You've successfully signed in.",
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      onSubmit={handleSumbit}
      fields={
        <AuthFields
          login={email}
          onChangeLogin={setEmail}
          password={password}
          onChangePassword={setPassword}
        />
      }
      actions={<SubmitButton>Sign Up</SubmitButton>}
      error={<ErrorMessage error={right(null)} />}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign In"
          url="/sign-in"
        />
      }
    />
  );
}
