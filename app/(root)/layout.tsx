import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

//
// This line makes sure that Next.js will re-render this component on the server
// every time, even if the user is already logged in. This is necessary because
// we need to check if the user is logged in on every request, and redirect them
// to the sign in page if they are not.
//
// Without this, Next.js would only render the component on the server the first
// time, and then use the cached version on subsequent requests, which would
// cause the user to not be redirected to the sign in page if they are not logged
// in.
export const dynamic = "force-dynamic";

/**
 * This is the main layout component for the dashboard.
 *
 * It will check if the user is logged in, and redirect them to the sign in page
 * if they are not.
 *
 * If the user is logged in, it will render the SideBar, Mobile Navigation, Header,
 * and the content passed in the `children` prop.
 *
 * @param children - The content to be rendered in the main section of the page.
 * @returns The rendered layout.
 */
async function Layout({ children }: { children: React.ReactNode }) {
  
    const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      {/* SideBar */}
      <Sidebar {...currentUser} />

      <section className="flex h-full flex-1 flex-col">
        {/* Mobile Navigation */}
        <MobileNavigation {...currentUser} />

        {/* Header */}
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />

        {/* Main Content */}
        <div className="main-content">{children}</div>
      </section>

      <Toaster />
    </main>
  );

};

export default Layout;
