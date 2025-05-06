import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"
const phoneRegex = new RegExp(/^[0-9]{9}$/)
export const contact_form_schema = z.object({
    fullname: z.string({
        invalid_type_error: "Špatně zadané jméno/ Invalid name",
        required_error: "Jméno je povinné / Name is required",
    })
    .min(3, {message: "Jméno je moc krátké / Name is too short"})
    .max(25, {message: "Jméno je moc dlouhé / Name is too long"})
    .trim(),
    email: z.string({
        invalid_type_error: "Špatně zadané E-mail/ Invalid e-mail",
        required_error: "E-mail je povinný / E-mail is required",
    })
    .email()
    .min(5, {message: "E-mail je moc krátký / E-mail is too short"})
    .trim(),
    tel: z.string({
        invalid_type_error: "Špatně zadané tel. číslo/ Invalid phone number",
        required_error: "Zel. číslo je povinný / Phone number is required",
    })
    .min(9,{message: "Tel. číslo je krátké / Phone number is too short"})
    .max(11,{message: "Tel. číslo je kdlouhé / Phone number is too long"})
    .trim()
    .regex(phoneRegex, {message: "Špatný formát tel. číslo / Bad phone number format"}),
    company: z.string().trim().optional(),
    message: z.string({
        invalid_type_error: "Špatně zadaná zpráva/ Invalid message",
        required_error: "Zpráva je povinná / Message number is required",
    })
    .trim()
    .min(5, {message: "Zpráva je krátká/ Message is too short"})
    .max(120, {message: "Zpráva je dlouhá / Message is too long"})
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
