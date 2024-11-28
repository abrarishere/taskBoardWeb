import EditDuoTone from "../assets/Edit_duotone.svg";
import Tasks from "./Tasks";
import LogoIcon from "../assets/Logo.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const MainTaskBoard = ({ defaultTaskBoardId, isMain }) => {
  const [tasks, setTasks] = useState([]);
  const [taskBoardTitle, setTaskBoardTitle] = useState("");
  const [taskBoardDescription, setTaskBoardDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [taskBoard, setTaskBoard] = useState({});

  const apiUrl = process.env.REACT_APP_API_URL;

  // Determine task board ID
  const taskBoardId = isMain
    ? defaultTaskBoardId
    : window.location.pathname.split("/board/")[1] || defaultTaskBoardId;

  // Fetch user tasks
  const getUserTasks = async () => {
    try {
      let currentTaskBoardId = Cookies.get("taskBoard") || taskBoardId;

      if (!currentTaskBoardId) {
        console.warn("No taskBoardId found. Using default task board ID...");
        Cookies.set("taskBoard", taskBoardId, { expires: 15, path: "/" });
      }

      const res = await axios.get(
        `${apiUrl}/task-board/${currentTaskBoardId}/tasks`
      );
      if (res.data) {
        setTasks(res.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Create a new task board
  const createTaskBoard = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/task-board`,
        {},
        { withCredentials: true }
      );
      if (res.status === 201 && res.data._id) {
        Cookies.set("taskBoard", res.data._id, { expires: 15, path: "/" });
        await getUserTasks();
      } else {
        console.error("API did not return a valid task board ID.");
      }
    } catch (error) {
      console.error("Error creating task board:", error);
    }
  };

  // Rename the task board title and description
  const renameTaskBoard = async () => {
    const newTitle = prompt("Enter new title for task board:", taskBoardTitle);
    const newDescription = prompt("Enter new description for task board:", taskBoardDescription);
    if (newTitle || newDescription) {
      try {
        const res = await axios.put(`${apiUrl}/task-board/${taskBoardId}`, {
          title: newTitle || taskBoardTitle,
          description: newDescription || taskBoardDescription,
        });
        if (res.data) {
          setTaskBoardTitle(res.data.title);
          setTaskBoardDescription(res.data.description);
        }
      } catch (error) {
        console.error("Error renaming task board:", error);
      }
    }
  };

  // Fetch task board details
  const fetchTaskBoard = async () => {
    try {
      const res = await axios.get(`${apiUrl}/task-board/${taskBoardId}`);
      if (res.data) {
        setTaskBoardTitle(res.data.title);
        setTaskBoardDescription(res.data.description);
        setTaskBoard(res.data);
      }
    } catch (error) {
      console.error("Error fetching task board:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getUserTasks();
    fetchTaskBoard();
  }, [taskBoardId]);

  return (
    <div
      className={`w-full flex flex-col py-12 items-start gap-8 min-h-screen h-full max-w-[500px] mx-auto ${
        isEditing ? "h-screen overflow-hidden" : ""
      }`}
    >
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 items-center justify-center">
          <img src={LogoIcon} alt="Logo" />
          <h1 className="text-[2.5rem] font-regular">{taskBoardTitle}</h1>
          <img
            src={EditDuoTone}
            alt="Pencil Icon"
            onClick={renameTaskBoard}
            className="cursor-pointer"
          />
        </div>
        <p className="font-regular text-[1rem] pl-12">
          {taskBoardDescription}
        </p>
      </div>
      {/* Render tasks component */}
      <Tasks tasks={tasks} isEditing={isEditing} setIsEditing={setIsEditing} taskBoard={taskBoard} getUserTasks={getUserTasks} />
    </div>
  );
};

export default MainTaskBoard;
