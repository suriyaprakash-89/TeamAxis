import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendInvoiceEmail = async (to, invoice, pdfAttachment) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `Invoice from Sales & Marketing System - #${invoice._id}`,
    text: `Hi ${invoice.clientName},\nPlease find your invoice attached.\n\nTotal Amount: $${invoice.totalAmount}`,
    attachments: [
      {
        filename: `invoice-${invoice._id}.pdf`,
        content: pdfAttachment,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invoice email sent successfully");
  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};
