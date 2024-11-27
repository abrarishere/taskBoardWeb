import Task from "./Task";
import IconBox from "./IconBox";
import AddRoundDuotone from "../assets/Add_round_duotone.svg";

const Tasks = ({ tasks }) => {
  const colours = {
    completedBg: "#A0ECB1",
    inProgressBg: "#F5D565",
    wontDoBg: "#F7D4D3",
    otherBg: "#00000022",
    completedButton: "#32D657",
    inProgressButton: "#E9A23B",
    wontDoButton: "#DD524C",
    otherButton: "#F8FAFC",
  };
  return (
    <div className="flex w-full flex-col gap-4">
      {tasks.map((task) => (
        <Task
          key={task._id}
          icon={task.icon}
          title={task.title}
          status={task.status}
          description={task.description}
          colours={colours}
        />
      ))}
      <div
        className={`flex justify-between items-center border bg-[#F5E8D5] p-3 rounded-2xl`}
      >
        <div className="flex justify-center gap-4">
          <IconBox
            bgColor="#E9A23B"
            icon={AddRoundDuotone}
            isImg={true}
            show={true}
          />
          <div className="flex flex-col justify-center items-start max-w-80">
            <h3 className="font-semibold text-[1.25rem]">Add new task</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
