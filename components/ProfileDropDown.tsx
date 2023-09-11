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
import AngleDownIcon from "./icons/AngleDownIcon";
import Link from "next/link";
import { profileDropdownItems } from "@/utils/constants";
import SignoutIcon from "./icons/SignoutIcon";
import { signOutUser } from "@/firebase/auth";

interface ProfileDropDownProps {
  user: any;
}

const ProfileDropDown = ({ user }: ProfileDropDownProps) => {
  return (
    <Dropdown>
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
        aria-label=""
        itemClasses={{
          base: [
            "data-[hover=true]:bg-light/80",
            "data-[hover=true]:border-red-500"
          ],
        }}
      >
        <DropdownSection showDivider className="xs:hidden">
          <DropdownItem 
            isReadOnly
            title={user.displayName}
            description={user.email}
            classNames={{
              base: [ "data-[hover=true]:bg-transparent" ],
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
            >
              <Link href={item.href} className="block pl-2">
                {item.name}
              </Link>
            </DropdownItem>
          ))}
        </DropdownSection>

        <DropdownSection className="px-2">
          <DropdownItem
            startContent={<SignoutIcon className="w-4 h-4"  />}
            onPress={signOutUser}
            classNames={{
              base: [
                "data-[hover=true]:bg-danger-100/50",
                "data-[hover=true]:text-danger-500",
                "hover:fill-danger-500",
              ], 
              title: "pl-2"
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
