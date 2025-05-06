import { defineType, defineField } from "sanity";


export const projects = defineType({
    name: "projects",
    title: "Projekty",
    type: "document",
    fields: [
        defineField({
            name: "project_type",
            title: "Typ",
            type: "string",
            options: {
                list: [
                    "Hobby", "Work"
                ]
            }
        }),
        defineField({
            name: "title_cz",
            title: "Titulek česky",
            type: "string",
        }),
        defineField({
            name: "title_en",
            title: "Titulek anglicky",
            type: "string",
        }),
        defineField({
            name: "year",
            title: "Rok dokončení",
            type: "string",
        }),
        defineField({
            name: "www",
            title: "Odkaz na web || Github(hobby)",
            type: "string",
        }),
        defineField({
            name: "images",
            title: "Obrázky",
            type: "image",
        }),
        defineField({
            name: "description_cz",
            title: "Popis projektu česky",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "description_en",
            title: "Popis projektu anglicky",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "review",
            type: "reference",
            title: "Hodnoceni",
            to: [
                {type: "reviews"}
            ]
        })
    ]
})