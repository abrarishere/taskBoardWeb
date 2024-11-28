import { useState } from "react";
import closeRingDuotoneYellow from "../assets/close_ring_duotone-y.svg";
import closeRingDuotone from "../assets/close_ring_duotone.svg";
import doneRoundDuotone from "../assets/Done_round_duotone.svg";
import timeAttackDuotone from "../assets/Time_atack_duotone.svg";
import doneRound from "../assets/Done_round.svg";
import DoneCircle from "./DoneCircle";
import IconBox from "./IconBox";
import TrashIcon from "../assets/Trash.svg";
import axios from "axios";

const EditWindow = ({ setIsEditing, task, setTask, getUserTasks, taskBoard }) => {
  const icons = ["🧑‍💻", "💬", "☕", "🏋️‍♂️", "⏰", "📚"];
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [icon, setIcon] = useState(task.icon || "");
  const [status, setStatus] = useState(task.status || "in-progress");

  const URL = process.env.REACT_APP_API_URL;

  const statuses = [
    {
      label: "In Progress",
      value: "in-progress",
      icon: timeAttackDuotone,
      bgColor: "#E9A23B",
    },
    {
      label: "Completed",
      value: "done",
      icon: doneRoundDuotone,
      bgColor: "#32D657",
    },
    {
      label: "Won’t do",
      value: "wont",
      icon: closeRingDuotone,
      bgColor: "#DD524C",
    },
  ];

  const saveHandler = async () => {
    console.log(task);
    if (!title || !icon) {
      alert("Please enter a title and select an icon.");
      return;
    }

    const payload = {
      title,
      description,
      icon,
      status,
      taskBoard,
    };

    try {
      if (task._id && task._id.length === 24) {
        
        await axios.put(`${URL}/task/${task._id}`, payload);
      } else {
        console.log("Creating new task", taskBoard);
        await axios.post(`${URL}/task`, payload);
      }

      getUserTasks();
      setIsEditing(false);
      setTask({ _id: "", title: "", description: "", icon: "", status: "" });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmDelete) {
        axios.delete(`${URL}/task/${task._id}`);
        getUserTasks();
        setIsEditing(false);
        setTask({ _id: "", title: "", description: "", icon: "", status: "" });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const StatusOption = ({ label, value, icon, bgColor }) => (
    <div
      className={`flex items-center gap-3 border-2 rounded-xl p-[1px] cursor-pointer justify-between pr-3 transition-all ${
        status === value
          ? "ring-2 ring-[#3662E3] border-[#3662E3]"
          : "border-[#00000022]"
      }`}
      onClick={() => setStatus(value)}
    >
      <div className="flex gap-3 items-center">
        <IconBox bgColor={bgColor} icon={icon} isImg={true} show={true} />
        <p className="font-semibold">{label}</p>
      </div>
      {status === value && <DoneCircle />}
    </div>
  );

  return (
    <div className="w-screen absolute top-0 right-0 min-h-[114vh] h-full p-2 bg-[#00000033] flex justify-end items-center">
      <div className="bg-[#F8FAFC] flex flex-col xl:w-[48vw] lg:w-[50vw] 2xl:w-[40vw] sm:w-full md:w-[60vw] w-full rounded-lg min-h-screen h-full p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-[1.4rem]">Task details</h4>
          <button
            className="p-2 rounded-lg border border-[#00000022] hover:bg-[#00000022]"
            onClick={() => setIsEditing(false)}
          >
            <img src={closeRingDuotoneYellow} alt="Close" />
          </button>
        </div>

        {/* Task Details Form */}
        <div className="flex flex-col w-full gap-4 mt-4">
          {/* Title Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-[#97A3B6] text-[0.75rem] font-medium"
            >
              Task name
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border-[#00000033] rounded-lg focus:border-[#3662E3] border-2 focus:outline-none"
              placeholder="Enter task name"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-[#97A3B6] text-[0.75rem] font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={7}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border-2 border-[#00000033] rounded-lg focus:border-[#3662E3] focus:outline-none"
              placeholder="Enter a short description"
            />
          </div>

          {/* Icon Selector */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="icon"
              className="text-[#97A3B6] text-[0.75rem] font-medium"
            >
              Icon
            </label>
            <div className="flex gap-1">
              {icons.map((iconOption) => (
                <div
                  key={iconOption}
                  onClick={() => setIcon(iconOption)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                    iconOption === icon ? "bg-yellow-500" : "bg-[#00000033]"
                  }`}
                >
                  {iconOption}
                </div>
              ))}
            </div>
          </div>

          {/* Status Selector */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="status"
              className="text-[#97A3B6] text-[0.75rem] font-medium"
            >
              Status
            </label>
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
              {statuses.map((statusOption) => (
                <StatusOption key={statusOption.value} {...statusOption} />
              ))}
            </div>
          </div>
        </div>

        {/* Save/Delete Buttons */}
        <div className="flex items-center justify-end gap-4 mt-16">
          <button
            className="p-2 px-6 bg-[#00000033] flex gap-2 text-white rounded-3xl hover:bg-[#1E3A8A]"
            onClick={handleDelete}
          >
            <span>Delete</span>
            <img src={TrashIcon} alt="Delete icon" />
          </button>
          <button
            className="p-2 px-6 bg-[#3662E3] flex gap-2 text-white rounded-3xl hover:bg-[#1E3A8A]"
            onClick={saveHandler}
          >
            <span>Save</span>
            <img src={doneRound} alt="Save icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWindow;
