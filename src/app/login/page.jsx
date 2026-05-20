"use client";

import { Suspense } from "react";

import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {

  return (

    <Suspense
      fallback={

        <div className="flex min-h-screen items-center justify-center">

          <span className="loading loading-spinner loading-lg"></span>

        </div>
      }
    >

      <LoginForm />

    </Suspense>
  );
};

export default LoginPage;