"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <br />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        defaultValue={state?.data?.password}
        error={state?.errors?.password}
      />

      <br />

      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
