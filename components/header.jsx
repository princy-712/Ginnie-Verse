
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ChevronDownIcon, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { checkUser } from '@/lib/checkUser';

const Header = async() => {
  await checkUser();
  return (
    // 1. HEADER: 
    // - 'flex': Creates the layout container.
    // - 'justify-between': Pushes the children to opposite ends (Logo left, Auth right).
    // - 'items-center': Vertically centers the Logo and the Auth buttons.
    <header className=" fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 support-[backdrop-filter]:bg-background/60 flex justify-between items-center px-6 py-3">
      
      {/* 2. LOGO (Left Side) */}
      {/* This is the first child, so 'justify-between' puts it on the left. */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link href='/'>
        <Image 
          src='/ginnieverse_img.png' 
          alt="Gennie-Verse logo" 
          width={200}  // Good for Next.js optimization
          height={200} // Good for Next.js optimization
          // Your class 'h-16' is perfect. 'w-auto' respects the aspect ratio.
           loading="eager"   // 👈 add this
           priority          // 👈 helps prefetch it faster
          className='h-16 w-auto object-contain'
        />
      </Link>
      <div className="flex items-center space-x-2 md:space-x-4">
        <SignedIn>
            <Link href={"/dashboard"}>
            <Button variant="outline">
                <LayoutDashboard  className="h-4 w-4" />
                <span className="hidden md:block cursor-pointer">Industry Insights</span> 
            </Button>
            </Link>
        
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">
      <StarsIcon className="h-4 w-4" />
      <span className="hidden md:block cursor-pointer">Growth tools</span>
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Link href={"/resume"} className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        <span>Build Resume</span>
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href={"/ai-cover-letter"} className="flex items-center gap-2">
        <PenBox className="h-4 w-4" />
        <span>Cover Letter</span>
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href={"/interview"} className="flex items-center gap-2">
        <GraduationCap className="h-4 w-4" />
        <span>Interview prep</span>
      </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

</SignedIn>
<div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton
appearance={{elements:{
    avtarBox:'w-10 h-10',
    userButtonPopoverCard: "shadow-xl",
    userPreviewMainIdentifier: "font-semibold"
},
}}
afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
      </div>
      </nav>
    </header>
  );
}

export default Header;