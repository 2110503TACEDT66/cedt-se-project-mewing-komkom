import { TimePicker } from "antd";
import { Dayjs } from "dayjs";

interface TimeSelectionProps {
    handleTimeChange: (time: Dayjs, timeType: string) => void;
    disabledTime: (current: Dayjs) => any;
  }
  
  const TimeSelection: React.FC<TimeSelectionProps> = ({
    handleTimeChange,
    disabledTime,
  }) => {
    return (
      <div className="col-span-3 flex gap-3">
        <TimePicker
          format="HH:mm"
          className="w-[150px] border-[#979797]"
          onChange={(time) => handleTimeChange(time, "start")}
          minuteStep={30}
        />
        <div className="text-center self-center text-[#736868] font-semibold text-base">
          To
        </div>
        <TimePicker
          format="HH:mm"
          className="w-[150px] border-[#979797] "
          onChange={(time) => handleTimeChange(time, "end")}
          minuteStep={30}
          disabledTime={disabledTime}
        />
      </div>
    );
  };

  export default TimeSelection;