// Task: Redirect the root page to the Login page

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}