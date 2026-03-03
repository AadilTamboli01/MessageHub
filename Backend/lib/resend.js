import dotenv from "dotenv";
dotenv.config();
import { Resend } from 'resend';
import { createWelcomeEmailTemplate } from '../Emails/EmailTemplate.js';

 export const resendClient = new Resend(process.env.Resend_API_Key);


export const sender = {
    email: process.env.Email_From ,
    name: process.env.Email_From_Name
}
  
 