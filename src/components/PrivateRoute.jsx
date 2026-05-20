"use client";

import { useEffect }
from "react";

import {
    useRouter,
    usePathname,
} from "next/navigation";

import { authClient }
from "@/lib/auth-client";

const PrivateRoute = ({
    children,
}) => {

    const router =
        useRouter();

    const pathname =
        usePathname();

    const {
        data: session,
        isPending,
    } = authClient.useSession();

    useEffect(() => {

        if (
            !isPending &&
            !session
        ) {

            router.replace(

                `/login?redirect=${pathname}`
            );
        }

    }, [

        session,

        isPending,

        router,

        pathname,
    ]);

    // LOADING
    if (isPending) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    // NOT LOGGED IN
    if (!session) {

        return null;
    }

    // LOGGED IN
    return children;
};

export default PrivateRoute;