"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
  User,
} from "@nextui-org/react";
import { RightFromBracket } from "../_icons/Index";
import Link from "next/link";
import { signOutUser } from "../_firebase/auth";
import { profileDropdownItems } from "../_utils/constants";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

interface ProfileDropDownProps {
  user: any;
}

const ProfileDropDown = ({ user }: ProfileDropDownProps) => {
  const { theme } = useTheme();

  return (
    <Dropdown 
      classNames={{
        content: theme === "dark" ? "bg-slate-800" : "",
      }}
    >
      <NavbarItem className="flex">
        <DropdownTrigger>
          <User
            as="button"
            isFocusable
            name={user.displayName}
            description={user.email}
            avatarProps={{
              src: user.photoURL,
              size: "sm",
            }}
            classNames={{
              base: "px-2 py-1",
              wrapper: "hidden xs:flex",
              name: "font-semibold",
            }}
          />
        </DropdownTrigger>
      </NavbarItem>

      {/* *SECTION - DROPDOWN MENU */}
      <DropdownMenu
        aria-label="profile dropdown menu"
      > 
        {/* *SECTION - name & email shown only on mobile */}
        <DropdownSection showDivider className="xs:hidden">
          <DropdownItem 
            isReadOnly
            title={user.displayName}
            description={user.email}
            classNames={{
              base: "data-[hover=true]:bg-transparent",
              title: "font-bold"
            }}
            >
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider className="px-2">
          { profileDropdownItems.map((item, i) => (
            <DropdownItem
              key={i}
              startContent={item.icon}
              className="capitalize"
              classNames={{
                base: twMerge(
                  theme === 'dark' ? 'data-[hover=true]:bg-slate-700' : 'data-[hover=true]:bg-slate-200' 
                ),
              }}
            >
              <Link href={item.href} className="block pl-2">
                {item.name}
              </Link>
            </DropdownItem>
          ))}
        </DropdownSection>

        <DropdownSection className="px-2">
          <DropdownItem
            startContent={<RightFromBracket size={15} />}
            onPress={signOutUser}
            classNames={{
              base: twMerge(
                'data-[hover=true]:text-danger-500', 
                theme === 'dark' ? 'data-[hover=true]:bg-danger-300/30' : 'data-[hover=true]:bg-danger-200/50 '
              ),
              title: "pl-2", 
            }}  
          >
            Sign out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropDown;
