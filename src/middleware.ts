import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the public routes that can be accessed without authentication
const isPublicRoute = createRouteMatcher([
  '/agency/sign-in(.*)',
  '/agency/sign-up(.*)',
  '/site(.*)',
  '/api/uploadthing(.*)',
  '/api/stripe/webhook(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get('host') || '';

  // Debugging logs
  console.log('--- Debug Logs ---');
  console.log(`Requested URL: ${url.pathname}`);
  console.log(`Host: ${hostname}`);
  console.log(`Search Params: ${searchParams}`);
  console.log(`Is Public Route: ${isPublicRoute(req)}`);
  console.log('-------------------');

  // Add the searchParams if available
  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Handle custom subdomain routing (exclude localhost)
  let customSubDomain = null;
  if (hostname !== 'localhost:3000') {
    customSubDomain = hostname
      .split(`.${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];
  }

  if (customSubDomain) {
    console.log(`Custom Subdomain Detected: ${customSubDomain}`);
    return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
  }

  // Redirect "/" to "/site"
  if (url.pathname === '/') {
    console.log("Redirecting '/' to '/site'");
    return NextResponse.redirect(new URL('/site', req.url));
  }

  // Check if route is public
  if (!isPublicRoute(req)) {
    console.log(`Protecting route: ${url.pathname}`);
    try {
      await auth.protect(); // Check if auth protection is working
      console.log('Authentication successful');
    } catch (error) {
      console.error('Authentication failed:', error);
      return NextResponse.redirect(new URL('/agency/sign-in', req.url));
    }
  } else {
    console.log(`Public route accessed: ${url.pathname}`);
  }

  // Proceed to the next handler
  return NextResponse.next();
});

export const config = {
  matcher: [ '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
