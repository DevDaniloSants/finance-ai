"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface CustomSelectProps {
  time: string;
  handleTimeChange: (value: string) => void;
  options: { value: string; label: string }[] | number[];
}

const CustomSelect = ({
  time,
  handleTimeChange,
  options,
}: CustomSelectProps) => {
  const formattedOptions =
    options && typeof options[0] === "number"
      ? options.map((option) => ({
          value: option.toString(),
          label: option.toString(),
        }))
      : (options as { value: string; label: string }[]);

  return (
    <Select
      onValueChange={(value) => handleTimeChange(value)}
      defaultValue={time ?? ""}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Selecione o mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formattedOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
