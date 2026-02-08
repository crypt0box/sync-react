import { Button } from "@/components//ui/button";
import { IconButtonShimmer } from "./ButtonShimmer.jsx";

export default function PendingButton({ action, onClick, loading, children }) {
  const isPending = loading;

  function handleClick(e) {
    e.preventDefault();
    if (action) {
      action();
    } else {
      onClick && onClick(e);
    }
  }

  return (
    <Button
      className="relative overflow-hidden cursor-pointer"
      variant="outline"
      size="icon-lg"
      onClick={handleClick}
    >
      <IconButtonShimmer isPending={isPending}>{children}</IconButtonShimmer>
    </Button>
  );
}
