"use client";

import Link from "next/link";
import Image from "next/image";
import spotifyIcon from "./../../public/spotifyIcon.svg";

export const Footer = () => {
  return (
    <div className="  mx-auto max-w-3xl w-full flex flex-col gap-12">
      <Spotify />
      <div className=" flex flex-col sm:flex-row gap-6 py-8 border-t dark:border-gray-600 px-2 sm:px-0">
        {footerData.map((data) => {
          return (
            <div className=" w-full flex flex-col gap-6">
              {data.map((item) => {
                return (
                  <Link
                    href={item.link}
                    className=" hover:text-gray-900 dark:hover:text-gray-200  cursor-pointer duration-300 text-gray-600 dark:text-gray-400 w-fit transition-all"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const footerData = [
  [
    { name: "Home", link: "#" },
    // { name: "Dashboard", link: "#" },
    { name: "Resume", link: "#" },
    {
      name: "Resources",
      link: "https://majestic-potential-d88.notion.site/13ac368d3f0b8009a24ad5e8cd37d8b9?pvs=4",
    },
    { name: "Contact Me", link: "/contact-me" },
  ],
  [
    { name: "GitHub", link: "https://github.com/ashish11011" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/ashish-bishnoi/" },
    { name: "Twitter", link: "https://x.com/bishnoi11011" },
  ],
  [
    {
      name: "Twitter DM",
      link: "https://twitter.com/messages/compose?recipient_id=bishnoi11011&text=Hi%20Ashish%20Bishnoi",
    },
    // { name: "Freelancing", link: "/freelancing" },
    {
      name: "Design Inspiration",
      link: "https://majestic-potential-d88.notion.site/13ac368d3f0b8009a24ad5e8cd37d8b9?pvs=4",
    },
  ],
];

const Spotify = () => {
  return (
    <div className=" max-w-3xl w-full mx-auto -mb-8 flex gap-2">
      <Image
        src={spotifyIcon}
        width={25}
        height={25}
        alt="spotify icon"
      ></Image>
      <Link
        href={
          "https://open.spotify.com/playlist/4Xq9YEkGnCFkH7byISgMSm?si=fcda167ec1d84b84&nd=1&dlsi=4329a13a9bdd4328"
        }
        target="_blank"
        className=" dark:text-gray-400"
      >
        Spotify
      </Link>
    </div>
  );
};
