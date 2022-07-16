import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../type";
import { BASE_URL } from "../../utils";
import { IPropsParams } from "../detail/[id]";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);

  const videos = showUserVideos
    ? "border-b-2 border-[#ECB365]"
    : "text-gray-400";
  const liked = !showUserVideos
    ? "border-b-2 border-[#ECB365]"
    : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };
    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4  w-full">
        <div className="flex gap-3  p-2 cursor-pointer font-semibold rounded ">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              className="rounded-full"
              layout="responsive"
              src={user?.image}
              width={34}
              height={34}
              alt="suggesteduser"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="md:text-2xl tracking-wider flex gap-1 justify-center items-center text-md font-bold lowercase text-white">
              {user.userName.replaceAll(" ", " ")}
              <GoVerified className="text-[#ECB365]" />
            </p>
            <p className="capitalize text-[#ECB365] text-md">{user.userName}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-800 bg-[#041C32] w-full">
        <p
          onClick={() => setShowUserVideos(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-white ${videos}`}
        >
          Videos
        </p>
        <p
          onClick={() => setShowUserVideos(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-white ${liked}`}
        >
          Liked
        </p>
      </div>
      <div className="flex gap-6 flex-wrap md:justify-center">
        {videosList.length > 0 ? (
          videosList.map((post: Video, idx: number) => (
            <VideoCard key={idx} post={post} />
          ))
        ) : (
          <NoResults text={`No ${showUserVideos ? "" : "liked"} Videos yet`} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }: IPropsParams) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  console.log(res);

  return {
    props: {
      data: res.data,
    },
  };
};
export default Profile;
