import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "./ui/input";

type MoneyInputProps = NumericFormatProps<InputProps>;

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";

export default MoneyInput;
