import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/app/_lib/utils";
import { Calendar } from "./calendar";
import React from "react";
import { ptBR } from "date-fns/locale";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? (
            new Date(value).toLocaleDateString("pt-Br", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
          ) : (
            <span>Selecione uma data...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
