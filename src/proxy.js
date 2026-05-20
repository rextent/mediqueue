import {
  NextResponse,
} from "next/server";

export const proxy = async (
  request
) => {

  const pathname =
    request.nextUrl.pathname;

  const protectedRoutes = [

    "/add-tutor",

    "/my-tutors",

    "/my-bookings",
  ];

  const isProtected =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(
          route
        )
    );

  // NOT PROTECTED
  if (!isProtected) {

    return NextResponse.next();
  }

  try {

    // BETTER AUTH SESSION CHECK
    const response =
      await fetch(

        "https://mediqueue-server-f.vercel.app/api/auth/get-session",

        {
          headers: {

            cookie:
              request.headers.get(
                "cookie"
              ) || "",
          },
        }
      );

    const session =
      await response.json();

    // NOT LOGGED IN
    if (!session?.user) {

      const loginUrl =
        new URL(
          "/login",
          request.url
        );

      loginUrl.searchParams.set(

        "redirect",

        pathname
      );

      return NextResponse.redirect(
        loginUrl
      );
    }

    // LOGGED IN
    return NextResponse.next();

  } catch (error) {

    console.log(error);

    return NextResponse.redirect(

      new URL(
        "/login",
        request.url
      )
    );
  }
};

export const config = {

  matcher: [

    "/add-tutor/:path*",

    "/my-tutors/:path*",

    "/my-bookings/:path*",
  ],
};