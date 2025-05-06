
import { defineType, defineField } from "sanity";


export const reviews = defineType({
    name: "reviews",
    title: "Hodnocení",
    type: "document",
    fields: [
        defineField({
            name: "year",
            title: "Rok",
            type: "string",
        }),
        defineField({
            name: "client",
            title: "Klient",
            type: "string",
        }),
        defineField({
            name: "company",
            title: "Firma",
            type: "string",
        }),
        defineField({
            name: "review_cz",
            title: "Hodnocení česky",
            type: "string",
        }),
        defineField({
            name: "review_en",
            title: "Hodnocení anglicky",
            type: "string",
        }),
    ]
})