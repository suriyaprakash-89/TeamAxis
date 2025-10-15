import Invoice from "../models/Invoice.js";
import { sendInvoiceEmail } from "../utils/emailService.js";
import pdfkit from "pdfkit";

export const createInvoice = async (req, res) => {
  const { clientName, clientEmail, products, totalAmount, location } = req.body;
  const invoice = new Invoice({
    clientName,
    clientEmail,
    products,
    totalAmount,
    location,
    generatedBy: req.user._id,
  });

  const createdInvoice = await invoice.save();

  // Generate PDF and email it
  const doc = new pdfkit();
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    let pdfData = Buffer.concat(buffers);
    await sendInvoiceEmail(clientEmail, createdInvoice, pdfData);
  });

  doc.fontSize(25).text(`Invoice #${createdInvoice._id}`);
  doc.fontSize(16).text(`Client: ${clientName}`);
  doc.text(`Total: $${totalAmount}`);
  // Add more details to PDF...
  doc.end();

  res.status(201).json(createdInvoice);
};

export const getInvoices = async (req, res) => {
  const query = req.user.role === "Admin" ? {} : { generatedBy: req.user._id };
  const invoices = await Invoice.find(query).populate("generatedBy", "name");
  res.json(invoices);
};
