import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

type AuthFormLayoutProps = {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export function AuthFormLayout({
  title,
  description,
  fields,
  actions,
  link,
  error,
  onSubmit,
}: AuthFormLayoutProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields}
          {error}
          {actions}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
}
