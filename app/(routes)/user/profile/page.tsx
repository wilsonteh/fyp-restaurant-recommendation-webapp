"use client";
import { auth } from "@/app/_firebase/auth";
import { Pen, Save, Times } from "@/app/_icons/Index";
import { Button, Input } from "@nextui-org/react";
import { User } from "firebase/auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useUpdateEmail, useUpdateProfile } from "react-firebase-hooks/auth";
import { twMerge } from "tailwind-merge";

export default function ProfilePage() {

  const [user, loading, error] = useAuthState(auth)
  const [updateProfile, profileUpdating, profileUpdateError] = useUpdateProfile(auth);
  const [updateEmail, emailUpdating, emailUpdateError] = useUpdateEmail(auth);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [router, user])
  
  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start">
      <ProfileOverview user={user!} />
      <ProfileForm
        user={user!}
        updateProfile={updateProfile}
        updateEmail={updateEmail}
      />
    </div>
  );
};

const ProfileOverview = ({ user }: { user: User }) => {
  return (
    <div className="w-full md:w-1/4 p-4 flex flex-col items-center gap-4">
      <Image
        src={user?.photoURL! || "/images/no-img.jpg"}
        alt={user?.displayName! || "user profile picture"}
        className="rounded-full"
        width={200}
        height={200}
      />

      <h1 className="text-2xl font-semibold"> {user?.displayName} </h1>
      <div className="text-lg"> {user?.email} </div>
      <div className=""> {user?.phoneNumber} </div>
    </div>
  )
};

const ProfileForm = ({ user, updateProfile, updateEmail }: { user: User, updateProfile: any, updateEmail: any }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  })

  const submitProfileUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
    setLoading(true);
    setIsEditing(false);
    e.preventDefault();
    try {
      await updateProfile({ displayName: userInfo.displayName })
      await updateEmail({ displayName: userInfo.displayName })
    } catch (e) {
      console.error("Error updating profile")
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className='w-full md:w-3/4 px-8 py-4'>
      <h1 className="text-2xl font-semibold flex flex-col gap-6 mb-4">User Profile</h1>

      <div className="input-fields flex flex-col gap-4">
        <Input
          label="Display Name"
          variant="bordered"
          placeholder="Enter your display name"
          size="lg"
          labelPlacement="outside"
          isDisabled={!isEditing}
          value={isEditing ? userInfo.displayName || "" : user?.displayName || ""}
          onChange={(e) => setUserInfo({ ...userInfo, displayName: e.target.value })}
          />

        <Input
          label="Email"
          variant="bordered"
          placeholder="Enter your email address"
          size="lg"
          labelPlacement="outside"
          isDisabled={true}
          value={isEditing ? userInfo.email || "" : user?.email || ""}
          // onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />

        <Input
          label="Phone Number"
          variant="bordered"
          placeholder="Enter your phone number"
          size="lg"
          labelPlacement="outside"
          isDisabled={true}
          value={isEditing ? userInfo.phoneNumber || "" : user?.phoneNumber || ""}
          // onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
        />
      </div>

      <div className="flex justify-end items-center gap-4">
        <Button
          color="warning"
          className="mt-4"
          onClick={() => {
            setIsEditing(!isEditing)
            setUserInfo({
              ...userInfo, 
              displayName: user.displayName || '', 
            })
          }}
          startContent={isEditing ? <Times size={15} /> : <Pen size={15} /> }
          isLoading={loading}
        >
          { isEditing ? "Cancel" : "Edit Info"}
        </Button>

        <Button 
          type="submit"
          color="primary" 
          className="mt-4"
          isDisabled={!isEditing}
          onClick={submitProfileUpdate}
          startContent={ loading ? null : <Save size={15} />}
          isLoading={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
}