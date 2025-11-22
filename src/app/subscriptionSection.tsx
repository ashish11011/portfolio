"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import whatsappIcon from "./../../public/whatsappIcon.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [formResponse, setFormResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFormSubmition = async (e: any) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      try {
        const saveForm = async (email: string) => {
          const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          setFormResponse(data.message);
        };
        await saveForm(email);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (formResponse) {
      setTimeout(() => {
        setFormResponse("");
      }, 4000);
    }

    return () => {};
  }, [formResponse]);

  return (
    <div className=" border rounded-sm bg-blue-50 dark:bg-gray-800 dark:border-gray-600 mx-auto max-w-3xl w-full p-6 flex gap-4 flex-col">
      <div className="flex flex-col gap-0">
        <div className=" text-2xl sm:font-bold font-semibold dark:text-gray-200">
          Want to hire me as a freelancer? Let's discuss.
        </div>
        <div className=" text-gray-500 dark:text-gray-400">
          Drop your message and let's discuss about your project.
        </div>
      </div>

      <Link
        href={"https://wa.me/6239565852?text=Hi%20Ashish%20Bishnoi"}
        className=" flex items-center rounded bg-green-500 hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 duration-300 gap-2 flex-row-reverse sm:justify-end cursor-pointer sm:w-fit w-full p-1.5 justify-center group"
      >
        <div className=" text-white dark:text-gray-200 font-semibold">
          Text on whatsapp
        </div>
        <Image
          className=" cursor-pointer rounded flex"
          src={whatsappIcon}
          alt="whatsapp icon"
          width={28}
          height={28}
        ></Image>
      </Link>

      <form className=" border-t dark:border-gray-600 py-4 flex flex-col gap-2">
        <div className=" text-gray-500 dark:text-gray-200 ">
          Drop in your email ID and I will get back to you.
        </div>
        <div className="flex">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
            size={120}
            className=" bg-white h-10 rounded-none "
            placeholder="bishnoi11011@gmail.com"
          ></Input>
          <Button
            size={"lg"}
            disabled={loading}
            onClick={handleFormSubmition}
            className=" rounded-none bg-green-600 hover:bg-green-700"
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </div>
        <div className=" text-green-600 dark:text-green-400">
          {formResponse}
        </div>
      </form>
    </div>
  );
};

export default SubscriptionSection;
