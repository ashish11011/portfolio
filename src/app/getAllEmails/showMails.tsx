"use client";

import { Cross } from "lucide-react";
import { useRouter } from "next/navigation";

const ShowMails = (props: any) => {
  const email = JSON.parse(props.email);
  const index = props.index;
  const router = useRouter();

  function convertTimestamp(isoString: string) {
    const date = new Date(isoString);

    // Format options for a readable date and time
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      //   second: "2-digit",
      //   timeZoneName: "short",
    };

    // Convert to a localized string
    return date.toLocaleString("en-US", options);
  }

  const removeEmailHandler = () => {
    console.log(email.email);
    fetch("/api/removeEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.email }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    router.refresh();
    console.log(email);
  };

  return (
    <div key={index} className="flex items-center">
      <div className=" p-2">{index + 1}</div>
      <div className=" flex md:gap-1 flex-col md:flex-row">
        <a
          href={`mailto:${email.email}`}
          className=" p-2 cursor-pointer hover:underline"
        >
          {email.email}
        </a>
        <div className=" p-2">{convertTimestamp(email.createdAt)}</div>
      </div>
      {/* <div onClick={removeEmailHandler} className=""></div> */}
      <Cross
        onClick={removeEmailHandler}
        className=" ml-4 cursor-pointer rotate-45 hover:fill-black"
      />
    </div>
  );
};

export default ShowMails;
