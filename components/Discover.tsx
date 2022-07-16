import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";
const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const activeTopicStyle =
    "xl:border-2 hover:bg-[##ECB365]  xl:border-[#ECB365] px-3 py-2 rounded xl:rounded-full flex  items-center gap-2 justify-center cursor-pointer text-[#ECB365]";
  const topicStyle =
    "xl:border-2 hover:bg-[#ECB365] hover:text-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap hover:text-primary">
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-white text-2xl">{item.icon}</span>
              <span className="font-medium text-md hidden text-white xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
