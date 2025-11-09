import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function PTextarea({ title, placeholder, value, onChange, className }: any) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <p className="font-medium">{title}</p>
      <Textarea
        placeholder={placeholder}
        value={value}
        rows={4}
        onChange={onChange}
        className="rounded-md border bg-white px-2 py-1.5"
      />
    </div>
  );
}

export default PTextarea;
