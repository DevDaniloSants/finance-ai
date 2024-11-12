import { ReactNode } from "react";

interface PercentageItemProps {
  value: number;
  title: string;
  icon: ReactNode;
}

const PercentageItem = ({ value, title, icon }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="rounded-[8px] bg-white bg-opacity-[3%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm">{value}%</p>
    </div>
  );
};

export default PercentageItem;
