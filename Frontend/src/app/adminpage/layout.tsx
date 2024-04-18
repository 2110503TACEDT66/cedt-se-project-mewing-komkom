import React from "react";
import { CardProvider } from "@/context/CardContext";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CardProvider>{children}</CardProvider>
    </div>
  );
}
