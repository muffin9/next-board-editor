import { Dispatch, SetStateAction } from "react";
import { BasicDatePicker } from "./date-picker";

interface LabelDatePickerProps {
    label: string;
    date: Date | undefined;
    setDate?: Dispatch<SetStateAction<Date | undefined>>;
}

function LabelDatePicker({ label, date, setDate }: LabelDatePickerProps) {
    return (
        <div className="max-w-64 flex items-center gap-3">
            <small className="text-xs font-medium leading-none text-[#6D6D6D]">
                {label}
            </small>
            <BasicDatePicker date={date} setDate={setDate} />
        </div>
    );
}

export { LabelDatePicker };
