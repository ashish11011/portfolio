"use client";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const TitleDatepicker = ({ title, value, onChange, className }: any) => {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <p className="font-medium">{title}</p>
      <DatePicker date={dayjs(value).toDate()} setDate={onChange} />
    </div>
  );
};

export default TitleDatepicker;

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ date, setDate }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
