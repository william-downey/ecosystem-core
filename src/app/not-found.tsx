import { redirect } from "next/navigation";
import { fallbackRoute } from "@/lib/governance";

export default function NotFound() {
  redirect(fallbackRoute());
}
