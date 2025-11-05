// Importing React Suspense for handling async client components
import { Suspense } from "react";
// Importing function to fetch page data and preview mode checker from Contentstack utilities
import { getPage, isPreview } from "@/lib/contentstack";
// Importing the Page component to render static content
import Page from "@/components/Page";
// Importing the Preview component to render live preview content
import Preview from "@/components/Preview";

// Home page component - serves as the main entry point for the application
// This is an async server component that can fetch data at build time or request time
export default async function Home() {
  // Check if the application is running in preview mode
  // Preview mode enables live editing capabilities for content creators
  if (isPreview) {
    // Return the Preview component wrapped in Suspense boundary
    // Suspense is required for useSearchParams() hook in Next.js 15
    // The path "/" represents the home page URL in Contentstack
    return (
      <Suspense fallback={<div className="flex flex-col items-center justify-center h-screen"><p>Loading...</p></div>}>
        <Preview path="/" />
      </Suspense>
    );
  }

  // In production mode, fetch the page data server-side for better performance
  const page = await getPage("/"); // Fetch home page content from Contentstack

  // Return the static Page component with the pre-fetched data
  return <Page page={page} />;
}
