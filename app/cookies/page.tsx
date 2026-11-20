import type { Metadata } from "next";
import CookiePolicy, { COOKIE_POLICY_TITLE } from "@/Ui/components/views/legal/CookiePolicy";

export const metadata: Metadata = { title: COOKIE_POLICY_TITLE };

export default function Page() {
  return <CookiePolicy />;
}
