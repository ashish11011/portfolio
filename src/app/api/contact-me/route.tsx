import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();
  const ses = new AWS.SES({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_S3_SECRET_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
  });

  /* The following example sends a formatted email: */

  // var params = {
  //   Destination: {
  //     BccAddresses: [],
  //     // CcAddresses: ["recipient3@example.com"],
  //     ToAddresses: ["bishnoi11011@gmail.com"],
  //   },
  //   Message: {
  //     Body: {
  //       Html: {
  //         Charset: "UTF-8",
  //         Data: 'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
  //       },
  //       Text: {
  //         Charset: "UTF-8",
  //         Data: "This is the message body in text format.",
  //       },
  //     },
  //     Subject: {
  //       Charset: "UTF-8",
  //       Data: "Test email",
  //     },
  //   },
  //   ReplyToAddresses: [],
  //   ReturnPath: "",
  //   ReturnPathArn: "",
  //   Source: "bishnoi11011@gmail.com",
  //   SourceArn: "",
  // };

  var params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: `Name: ${name} \nEmail: ${email} \nMessage: ${message}` },
      },
      Subject: { Data: "Test email" },
    },
    Source: "bishnoi11011@gmail.com",
    ReplyToAddresses: [email],
  };

  ses.sendEmail(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
   data = {
    MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000"
   }
   */
  });

  return NextResponse.json({ message: "Submitted and email sent." });
}
