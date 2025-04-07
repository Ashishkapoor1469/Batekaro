import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({});
export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|.*\\.(?:html|css|js|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot|json)).*)',
    '/api/(.*)',
  ],
};
