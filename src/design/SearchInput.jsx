import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export default function SearchInput({ value, changeAction }) {
  function handleChange(e) {
    const newValue = e.target.value;
    changeAction(newValue);
  }

  return (
    <div className="px-8">
      <InputGroup className="relative overflow-hidden">
        <InputGroupInput
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
