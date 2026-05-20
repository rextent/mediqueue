import {
  NextResponse,
} from "next/server";

export const proxy = (
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

  if (!isProtected) {

    return NextResponse.next();
  }

  const sessionToken =

    request.cookies.get(
      "__Secure-better-auth.session_token"
    ) ||

    request.cookies.get(
      "better-auth.session_token"
    );

  if (!sessionToken) {

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