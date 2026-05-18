"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function PrivateRoute({
  children,
}) {

  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  useEffect(() => {

    if (
      !isPending &&
      !session
    ) {

      router.push("/login");

    }

  }, [
    session,
    isPending,
    router,
  ]);

  // LOADING
  if (isPending) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );
  }

  // BLOCK
  if (!session) {

    return null;

  }

  return children;
}