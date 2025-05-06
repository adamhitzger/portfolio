import UI from "@/components/ui";
import { sanityFetch } from "@/sanity/lib/client";
import { get_projects, get_hobby_projects, get_reviews } from "@/sanity/lib/query";
import { Projects, Reviews } from "@/types";

export default async function Home() {
  const reviewsPromise = await sanityFetch<Reviews>({query: get_reviews});
  const hobbyPromise = await sanityFetch<Projects>({query: get_hobby_projects});
  const projectsPromise = await sanityFetch<Projects>({query: get_projects});
  const [reviews, projects, hobby] = await Promise.all([
    reviewsPromise,
    projectsPromise,
    hobbyPromise
  ])
  return (
    <UI projects={projects} hobby={hobby} reviews={reviews}/>
  );
}
