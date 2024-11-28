import Task from "./Task";
import IconBox from "./IconBox";
import AddRoundDuotone from "../assets/Add_round_duotone.svg";
import { useState } from "react";
import EditWindow from "./EditWindow";

const Tasks = ({ tasks, isEditing, setIsEditing, taskBoard,getUserTasks }) => {
  const [task, setTask] = useState({
    _id: "",
    title: "",
    description: "",
    icon: "",
    status: "",
  });
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
    <>
      <div className={`flex w-full flex-col gap-4 `}>
        {tasks.map((task) => (
          <Task
            key={task._id}
            icon={task.icon}
            title={task.title}
            status={task.status}
            description={task.description}
            colours={colours}
            task={task}
            setTask={setTask}
            setIsEditing={setIsEditing}
            taskBoard={taskBoard}
          />
        ))}
        <div
          className="p-1 border-2 border-transparent rounded-2xl hover:border-[#3662E3]"
          onClick={() => setIsEditing(true)}
        >
          <div
            className={`flex justify-between items-center border bg-[#F5E8D5] p-4 rounded-2xl`}
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
      </div>
      {isEditing && (
        <EditWindow setIsEditing={setIsEditing} task={task} setTask={setTask} getUserTasks={getUserTasks} taskBoard={taskBoard} />
      )}
    </>
  );
};

export default Tasks;
