import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Plan your trip" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Plan your trip"
      heading={<>The five-step inquiry brief.</>}
      lede="A structured form that turns your trip idea into a real brief the agent can quote against. Built in the next step of the plan — react-hook-form + zod, server actions, Resend, anti-bot."
    />
  );
}
