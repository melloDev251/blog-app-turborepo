"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
        />
      </div>
      {!!state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <br />

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

      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
