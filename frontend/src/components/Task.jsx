import IconBox from "./IconBox";
import closeRingDuotone from "../assets/close_ring_duotone.svg";
import doneRoundDuotone from "../assets/Done_round_duotone.svg";
import timeAttackDuotone from "../assets/Time_atack_duotone.svg";

const Task = ({ icon, title, status, description, colours }) => {

  const getStatusStyles = (status) => {
    switch (status) {
      case "done":
        return {
          bgColor: colours.completedBg,
          buttonColor: colours.completedButton,
          title: "Task Completed",
        };
      case "in-progress":
        return {
          bgColor: colours.inProgressBg,
          buttonColor: colours.inProgressButton,
          title: "Task In Progress",
        };
      case "wont":
        return {
          bgColor: colours.wontDoBg,
          buttonColor: colours.wontDoButton,
          title: "Task Won't Do",
          secondaryIcon: closeRingDuotone,
        };
      default:
        return {
          bgColor: colours.otherBg,
          buttonColor: colours.otherButton,
          title: "Task",
        };
    }
  };

  const chooseIcon = (status) => {
    switch (status) {
      case "done":
        return doneRoundDuotone;
      case "in-progress":
        return timeAttackDuotone;
      case "wont":
        return closeRingDuotone;
      default:
        return "";
    }
  };

  const { bgColor, buttonColor } = getStatusStyles(status);

  return (
    <div
      className={`flex justify-between items-center border p-3 rounded-2xl`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-center gap-4">
        <IconBox bgColor="#E3E8EF" icon={icon} isImg={false} show={true} />
        <div className="flex flex-col justify-center items-start max-w-80">
          <h3 className="font-semibold text-[1.25rem]">{title}</h3>
          <p className="text-[1rem]  font-light">{description}</p>
        </div>
      </div>
      <IconBox
        bgColor={buttonColor}
        icon={chooseIcon(status)}
        isImg={true}
        show={status !== "other"}
      />
    </div>
  );
};

export default Task;
