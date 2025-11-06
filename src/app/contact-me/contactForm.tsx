"use client";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const notify = () =>
    toast("🦄 Thank you for contacting me", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  async function handleFormSubmittion(e: any) {
    e.preventDefault();
    setLoading(true);
    if (formData.name && formData.email && formData.message) {
      const response = await fetch("/api/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        notify();
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    }
    setLoading(false);
  }
  return (
    <div className="max-w-3xl mx-auto w-full">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Contact Me
      </h2>
      <form className="flex flex-col gap-6">
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="py-2 px-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          placeholder="Email"
          className="py-2 px-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
        />
        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={(e) => handleInputChange(e)}
          rows={5}
          className="py-2 px-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
        ></textarea>
        <button
          type="submit"
          onClick={(e) => handleFormSubmittion(e)}
          className={` ${
            loading && "pointer-events-none"
          } py-2 px-4 rounded bg-blue-500 dark:bg-blue-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200`}
        >
          {loading ? (
            <LoaderCircle className=" mx-auto animate-spin" />
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
