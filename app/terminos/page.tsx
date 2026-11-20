import type { Metadata } from "next";
import Terms, { TERMS_TITLE } from "@/Ui/components/views/legal/Terms";

export const metadata: Metadata = { title: TERMS_TITLE };

export default function Page() {
  return <Terms />;
}
