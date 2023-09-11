"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth, signOutUser } from "@/firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { navbarItems } from "@/utils/constants";
import ProfileDropDown from "./ProfileDropDown";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const isNavItemActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Navbar maxWidth="xl" shouldHideOnScroll isBordered isBlurred={false} disableAnimation={false} isMenuDefaultOpen={true} onMenuOpenChange={setIsMenuOpen} >
      
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />

      <NavbarBrand className="">
        <h1 className="font-bold text-xl">MakanNow</h1>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex" justify="center">
        { navbarItems.map((navItem, i) => (
          <NavbarItem key={i}>
            <Link 
              href={navItem.href}
              className={`capitalize px-2 py-2 rounded-xl
              ${ isNavItemActive(navItem.href) ? "text-primary-700" : "hover:text-foreground/90 hover:font-medium"}`} >
              {navItem.item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* *SECTION -  MOBILE NAVBAR */}
      {isMenuOpen && (
        <NavbarMenu className="flex flex-col items-center gap-y-6 bg-gray-50 p-6">
          {navbarItems.map((navItem, i) => (
            <NavbarMenuItem key={i} className="">
              <Link href={navItem.href}
                className={`capitalize w-full px-4 py-2 rounded-xl 
                ${ isNavItemActive(navItem.href) ? "text-primary-700" : "hover:text-foreground/90 hover:font-medium" }`} >
                {navItem.item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}

      {/* *SECTION - RIGHT SECTION */}
      <NavbarContent justify="end" className="">
        {!user ? (
          <>
            <NavbarItem className="">
              <Link href="/login">Login</Link>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} color="primary" href="/signup">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <ProfileDropDown user={user} />
        )}
        
      </NavbarContent>

    </Navbar>
  );
};

export default Header;
