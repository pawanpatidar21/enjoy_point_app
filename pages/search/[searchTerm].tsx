import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";

import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../type";
import Link from "next/link";

interface IProps {
  videos: Video[];
}
const Search = ({ videos }: IProps) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { allUsers } = useAuthStore();
  const { searchTerm }: any = router.query;
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  const videosOne = isAccounts
    ? "border-b-2 border-[#ECB365]"
    : "text-gray-400";
  const likedOne = !isAccounts
    ? "border-b-2 border-[#ECB365]"
    : "text-gray-400";
  return (
    <div className="w-full">
      {" "}
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-800 bg-[#041C32] w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-white ${videosOne}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-white ${likedOne}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex  gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-800">
                  <div>
                    <Image
                      className="rounded-full"
                      src={user.image}
                      width={50}
                      height={50}
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
            ))
          ) : (
            <>
              <NoResults text={`No video results for ${searchTerm} `} />
            </>
          )}
        </div>
      ) : (
        <div className="md;mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm} `} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: {
    searchTerm: string;
  };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
