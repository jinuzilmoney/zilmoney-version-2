"use client";

import { Button } from "@/src/shared/ui/button";

export function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  );
}
