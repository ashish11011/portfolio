import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function PInput({
  title,
  placeholder,
  value,
  onChange,
  className,
  onKeyDown = () => {},
}: any) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <p className="font-medium">{title}</p>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="rounded-md border bg-white px-2 py-1.5"
      />
    </div>
  );
}

export default PInput;
