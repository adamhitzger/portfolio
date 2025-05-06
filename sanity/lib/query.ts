import { groq } from "next-sanity";

export const get_projects = groq`*[_type == 'projects' && project_type=="Work"]{
_id,    
title_cz,
project_type,
    title_en,
    year,
    www,
    "pictures": images.asset->url,
    description_cz,
    description_en,
    review
}`

export const get_hobby_projects = groq`*[_type == 'projects' && project_type=="Hobby"]{
_id,    
title_cz,
project_type,
    title_en,
    year,
    www,
    "pictures": images.asset->url,
    description_cz,
    description_en,
    review
}`

export const get_reviews = groq`*[_type == 'reviews'] | order(year asc){
_id,    
year,
    client,
    company,
    review_cz,
    review_en
}`