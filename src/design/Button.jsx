import { Button as ShaButton } from "@/components/ui/button";

export default function Button({ children, action }) {

  function handleClick(e) {
    e.stopPropagation();
      action();
  }
  return (
    <ShaButton onClick={handleClick}>
      {children}
    </ShaButton>
  );
}
