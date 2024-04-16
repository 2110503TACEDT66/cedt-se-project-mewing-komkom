import PreviewCard from "@/components/admin/PreviewCard";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="flex justify-center mt-20 mb-10 text-5xl font-bold">
        <div>
          Manage{" "}
          <span className="bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">
            Co-working{" "}
          </span>
          Space
        </div>
      </div>
      <div>
        <PreviewCard name="test" desc="test" img="test" seat="test" />
      </div>
    </div>
  );
}
