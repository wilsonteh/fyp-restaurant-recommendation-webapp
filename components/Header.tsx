"use client";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const Header = () => {

  const pathname = usePathname();  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { item: 'home', href: '/' },
    { item: 'explore', href: '/explore' },
    { item: 'link3', href: '#' },
    { item: 'link4', href: '#' },
  ]

  const isNavItemActive = (href: string) => {
    return pathname === href
  }

  return (
    <Navbar 
      maxWidth="xl" shouldHideOnScroll isBordered isBlurred={false} disableAnimation={false} isMenuDefaultOpen={true}
      onMenuOpenChange={setIsMenuOpen} 
      >
      <NavbarMenuToggle 
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="md:hidden" 
        />

      <NavbarBrand className="">
        <h1 className="font-bold text-xl">MakanNow</h1>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex" justify="center">
        {/* aria-current=page */}
        { navItems.map((navItem, i) => (
          <NavbarItem key={i}>
            <Link 
              href={navItem.href} 
              className={`capitalize px-2 py-2 rounded-xl
              ${isNavItemActive(navItem.href) ? 'text-primary-700' : 'hover:text-foreground/90 hover:font-medium'}`} 
              > 
              {navItem.item} 
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      
      {/* *SECTION -  MOBILE NAVBAR */}
      { isMenuOpen && (
        <NavbarMenu className="flex flex-col items-center gap-y-6 bg-gray-50 p-6">
          { navItems.map((navItem, i) => (
            <NavbarMenuItem key={i} className="">
              <Link 
                href={navItem.href} 
                className={`capitalize w-full px-4 py-2 rounded-xl 
                ${isNavItemActive(navItem.href) ? 'text-primary-700' : 'hover:text-foreground/90 hover:font-medium'}`} 
                > 
                {navItem.item} 
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    
      <NavbarContent justify="end" className="">
        <NavbarItem className="">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" >Sign Up</Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}
 
export default Header;