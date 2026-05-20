import {
  NextResponse,
} from "next/server";

export const proxy = (
  request
) => {

  const token =
    request.cookies.get(
      "token"
    );

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

  // NOT LOGGED IN
  if (
    isProtected &&
    !token
  ) {

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

  return NextResponse.next();
};

export const config = {

  matcher: [

    "/add-tutor/:path*",

    "/my-tutors/:path*",

    "/my-bookings/:path*",
  ],
};