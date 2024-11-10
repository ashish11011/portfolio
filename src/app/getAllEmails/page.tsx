import { connect } from "@/dbConfig/dbConfig";
import Email from "@/models/emailModel";
import ShowMails from "./showMails";

const GetAllEmails = async () => {
  connect();
  const emails = await Email.find({});

  return (
    <div className="max-w-lg w-full mx-auto mt-12">
      {emails.map((email, index) => (
        <ShowMails key={index} email={email} index={index} />
      ))}
    </div>
  );
};

export default GetAllEmails;
