import { BasicDatePicker } from "./date-picker";

interface LabelDatePickerProps {
    label: string;
}

function LabelDatePicker({ label }: LabelDatePickerProps) {
    return (
        <div className="max-w-64 flex items-center gap-3">
            <small className="text-xs font-medium leading-none text-[#6D6D6D]">
                {label}
            </small>
            <BasicDatePicker />
        </div>
    );
}

export { LabelDatePicker };
