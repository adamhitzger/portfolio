import { contact_form_schema } from "@/lib/utils";
import * as z from "zod"

export interface Project {
  _id: string;
    project_type: "Hobby" | "Work";
    title_cz: string;
    title_en: string;
    www: string;
    pictures: string | null;
    description_cz: any;
    description_en: any;
    year: string;
    review: {
        _type: "reference",
        _ref: "string"
    };
}

export interface Review {
  _id: string;
    year: string;
    client: string;
    company: string;
    review_cz: string;
    review_en: string;
}

export type Projects = Array<Project>
export type Reviews = Array<Review>

export interface ActionResponse<T> {
    success: boolean
    message: string;
    submitted: boolean;
    errors?: {
        [K in keyof T]?: string[];
      };
    inputs?: T 
  }

export type Form = z.infer<typeof contact_form_schema>