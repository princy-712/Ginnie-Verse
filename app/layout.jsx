import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genie-Verse - AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:"dark"}}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*Header*/}
            <Header />
            <main className="min-h-screen pt-22">{children}</main>
            <Toaster richColors />
             {/*Footer*/}
             <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-grey-200">
                <p>
                  Made with ❤️ by Princy
                </p>
              </div>
             </footer>

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
