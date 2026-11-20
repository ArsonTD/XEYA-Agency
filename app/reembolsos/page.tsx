import type { Metadata } from "next";
import RefundPolicy, { REFUND_POLICY_TITLE } from "@/Ui/components/views/legal/RefundPolicy";

export const metadata: Metadata = { title: REFUND_POLICY_TITLE };

export default function Page() {
  return <RefundPolicy />;
}
