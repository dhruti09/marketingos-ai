import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "./sign-in";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create workspace · MarketingOS AI" },
      { name: "description", content: "Create your MarketingOS AI workspace." },
    ],
  }),
  component: () => <AuthShell mode="signup" />,
});
