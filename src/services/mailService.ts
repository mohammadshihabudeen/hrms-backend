import nodemailer from "nodemailer";
import WelcomeEmailTemplate from "./mailTemplates"; // Import your template

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services
    auth: {
      user: "suryatheking5784@gmail.com",
      pass: "uuao evgj sbkt jzsn",
    },
  });

  let mailOptions = {
    from: "suryatheking5784@gmail.com",
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

export const sendRegistrationEmail = async (
  email: string,
  employeeName: string,
  password: string,
  employeeId: string
) => {
  const subject = `Welcome to Our Company, ${employeeName}!`;
  const htmlContent = WelcomeEmailTemplate({
    employeeName,
    password,
    employeeId,
  });
  await sendEmail(email, subject, htmlContent);
};
