import { Cross } from "lucide-react";
import { connect } from "./../../dbConfig/dbConfig";
import Email from "./../../models/emailModel";
import ShowMails from "./showMails";

const GetAllEmails = async () => {
  const data = await Email.find({});

  console.log(data);

  return (
    <div className=" max-w-lg w-full mx-auto mt-12">
      {data.map((email, index) => {
        return <ShowMails email={JSON.stringify(email)} index={index} />;
      })}
    </div>
  );
};

export default GetAllEmails;
