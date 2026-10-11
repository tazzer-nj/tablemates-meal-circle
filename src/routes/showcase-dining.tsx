import { createFileRoute } from "@tanstack/react-router";
import { RestaurantsPage } from "./restaurants";

// Private preview of the upcoming Dining screen, used for marketing screenshots.
export const Route = createFileRoute("/showcase-dining")({
  head: () => ({ meta: [{ title: "Dining preview | MealMate" }, { name: "robots", content: "noindex" }, { name: "description", content: "Preview of MealMate dining." }, { property: "og:title", content: "Dining preview | MealMate" }, { property: "og:description", content: "Preview of MealMate dining." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: RestaurantsPage,
});
