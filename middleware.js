import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};