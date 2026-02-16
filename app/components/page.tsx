import type { Metadata } from "next";
import { ComponentsShowcasePage } from "@/src/page-slices/components-showcase";

export const metadata: Metadata = {
  title: "Components",
};

export default function Components() {
  return <ComponentsShowcasePage />;
}
