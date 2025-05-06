"use server";
import { ActionResponse, Form } from "@/types"
import { contact_form_schema } from "./utils";
import { createTransport } from "nodemailer";

export default async function sendData(prevState: ActionResponse<Form>, formData: FormData): Promise<ActionResponse<Form>>{
    const rawData = {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        tel: formData.get("tel"),
        company: formData.get("company"),
        message: formData.get("message"),
    }
console.log(rawData)
    const {data, success,error} = contact_form_schema.safeParse(rawData);
console.log(data, success, error)
    if(error || !success){
        return{
            success: false,
            message: "Špatně zadané údaje / Bad details!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }

    const smtp = createTransport({
        service: "gmail",
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        }
      });
    const sentMail = await smtp.sendMail({
        subject: "Nová zpáva z portfolio webu",
        from: process.env.FROM_EMAIL,
        to: "adam.hitzger@icloud.com",
        text: `Celé jméno: ${data.fullname},\n E-mail: ${data.email},\n Tel. číslo: ${data.tel},\n Zpráva: ${data.message},\n Firma: ${data?.company}`
    })

    if(!sentMail.accepted){
        return{
            success: false,
            message: "Nepodařilo se zaslat zpávu / Can\'t send message",
        submitted: true,
        inputs: data
        }
    }
    return{
        success: true,
        message: "Zpráva odeslána / message sent!",
        submitted: true,
    }
}