"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import {FcGoogle} from "react-icons/fc";

type Props = {
  text: string,
  provider?: "google" | "facebook" | "apple" 
};

const SignInButton = ({ text, provider }: Props) => {

  if (!provider) {
    return (
      <Button
        onClick={() => {
          signIn("google").catch(console.error);
        }}
      >
        {text}
      </Button>
    )
  } else if (provider == "google") {
    return (
      <Button variant={'secondary'}
        onClick={() => {
          signIn("google").catch(console.error);
        }}
      >
        {text} 
        <FcGoogle className="ml-2 h-4 w-4"/>
      </Button>
    )
  }

};

export default SignInButton;