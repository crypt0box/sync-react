import { CircleCheckBig } from "lucide-react";
import PendingButton from "./PendingButton.jsx";
import { cn } from "@/lib/utils";

export default function CompleteButton({ complete, action }) {
  return (
    <PendingButton action={action}>
      {complete ? (
        <CircleCheckBig
          className={cn({ "text-chart-2": complete })}
          size={48}
        />
      ) : (
        <div></div>
      )}
    </PendingButton>
  );
}
