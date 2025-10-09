import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import admin from 'firebase-admin'; 

const db = admin.firestore();

// transporter for SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'volunteerstestingjulia@gmail.com',
    pass: 'qlnm uzfj sujp dfhb',
  },
});

// function to send email
export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const { subject, htmlContent, to } = req.body;

  // validate input
  if (!subject || !htmlContent || !to) {
    res.status(400).json({ error: 'Missing required fields: subject, htmlContent, or to' });
    return;
  }

  try {
    // just sending volunteers to my uni email
    const info = await transporter.sendMail({
      from: 'volunteerstestingjulia@gmail.com',
      to: to, //for now only sends to one email
      subject,
      html: htmlContent,
    });

    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }

};

//preview email on newsletter form
export const previewEmail = async (req: Request, res: Response): Promise<void> => {
  const { htmlContent } = req.body;

  // validate input
  if (!htmlContent) {
    res.status(400).json({ error: 'Missing required field: htmlContent' });
    return;
  }

  try {
    // return html content
    res.status(200).json({ 
      preview: htmlContent 
    });
  } catch (error) {
    console.error('Error generating preview:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
};
