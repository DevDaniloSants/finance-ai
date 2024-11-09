"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "./custom-select";

const MONTH_OPTIONS = [
  {
    value: "01",
    label: "Janeiro",
  },
  {
    value: "02",
    label: "Fevereiro",
  },
  {
    value: "03",
    label: "Março",
  },
  {
    value: "04",
    label: "Abril",
  },
  {
    value: "05",
    label: "Maio",
  },
  {
    value: "06",
    label: "Junho",
  },
  {
    value: "07",
    label: "Julho",
  },
  {
    value: "08",
    label: "Agosto",
  },
  {
    value: "09",
    label: "Setembro",
  },
  {
    value: "10",
    label: "Outubro",
  },
  {
    value: "11",
    label: "Novembro",
  },
  {
    value: "12",
    label: "Dezembro",
  },
];

const TimeSelect = ({ years }: { years: number[] }) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const handleYearChange = (year: string) => {
    if (month) {
      push(`/?month=${month}&year=${year}`);
    }
  };

  const handleMonthChange = (month: string) => {
    if (year) {
      push(`/?month=${month}&year=${year}`);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <CustomSelect
        time={month!}
        handleTimeChange={handleMonthChange}
        options={MONTH_OPTIONS}
      />

      <CustomSelect
        time={year!}
        handleTimeChange={handleYearChange}
        options={years}
      />
    </div>
  );
};

export default TimeSelect;
