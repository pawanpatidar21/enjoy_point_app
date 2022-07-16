import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../type";

const SuggestedAccounts = () => {
  const { fetchAllusers, allUsers } = useAuthStore();
  useEffect(() => {
    fetchAllusers();
  }, [fetchAllusers]);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-white font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-[#064663] p-2 cursor-pointer font-semibold rounded ">
              <div className="w-8 h-8">
                <Image
                  className="rounded-full"
                  layout="responsive"
                  src={user.image}
                  width={34}
                  height={34}
                  alt="suggesteduser"
                />
              </div>
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold lowercase text-white">
                  {user.userName.replaceAll(" ", " ")}
                  <GoVerified className="text-[#ECB365]" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
