"use client";

import { useEffect } from "react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const DashboardError = ({ error, reset }: ErrorBoundaryProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-container">
      <Heading
        title="Something went wrong"
        subtitle="This page failed to load. You can try again."
      />
      <div className="card w-full p-6">
        <Button type="button" variant="primary" size="md" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
