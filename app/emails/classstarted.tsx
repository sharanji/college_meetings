import { Class, Meetings, User } from "@prisma/client";

export interface mailDetails {
  classAjenda: string;
  classDetail: Meetings;
}
export default function ClassStartedEmail({
  classAjenda,
  classDetail,
}: mailDetails) {
  var htmlText = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invitation to Join ${classDetail.meetingName}</title>
  </head>
  <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Invitation to Join ${
            classDetail.meetingName
          }</h2>
          <p>Dear Students,</p>
          <p>I hope this email finds you well. I am writing to invite you to join our upcoming class, <strong>${
            classDetail.meetingName
          }</strong>. Below is a brief Ajenda of the class:</p>
          <ul>
              <li><strong>Class Name:</strong> ${classDetail.meetingName}</li>
              <li><strong>Ajenda:</strong> ${classAjenda}</li>
          </ul>
          <p>We believe that this class will be a valuable learning experience for you, and we encourage you to participate actively to make the most out of it.</p>
          <p>Here are the details for the class:</p>
          <ul>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
              <li><strong>Time:</strong> ${new Date().toTimeString()}</li>
              <li><strong>Class Link:</strong> <a href="${
                process.env.BaseUrl
              }api/meetings/invitelink?MEET_ID=${
    classDetail.id
  }">Join Meeting</a></li>
          </ul>
          <p>Please confirm your attendance by attending the class fully. If you have any questions or need further information, feel free to reach out.</p>
          <p>We look forward to having you in <strong>${
            classDetail.meetingName
          }</strong> and sharing an enriching learning journey together.</p>
      </div>
  </body>
  </html>
  `;
  return htmlText;
}
