"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const NAMESPACE = "hornamanchiropracticcenter";

interface CalButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CalButton({ children, className, onClick }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      data-cal-namespace={NAMESPACE}
      data-cal-link={NAMESPACE}
      data-cal-config='{"layout":"month_view"}'
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
