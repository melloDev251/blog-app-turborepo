"use client";
import { SessionUser } from "@/lib/session";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user: SessionUser;
};
const Profile = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            className="rounded-full w-12 border-2 border-white"
            src={user.avatar}
          />
          <AvatarFallback>
            <UserIcon className="w-12 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-3 items-center my-2 py-2">
          <UserIcon className="w-4 justify-self-end" />
          <p className="col-span-4 font-bold text-sky-400">{user.name}</p>
        </div>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end ">
          <Link href="/user/create-post" onClick={handleLinkClick}>
            <PencilSquareIcon className="w-4 " />
            <span>Create New Post</span>
          </Link>
          <Link href="/user/posts" onClick={handleLinkClick}>
            <ListBulletIcon className="w-4" />
            <span>My Posts</span>
          </Link>
          <a href="/api/auth/signout" onClick={handleLinkClick}>
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
