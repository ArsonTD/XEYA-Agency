import type { Metadata } from "next";
import PrivacyPolicy, { PRIVACY_POLICY_TITLE } from "@/Ui/components/views/legal/PrivacyPolicy";

export const metadata: Metadata = { title: PRIVACY_POLICY_TITLE };

export default function Page() {
  return <PrivacyPolicy />;
}
