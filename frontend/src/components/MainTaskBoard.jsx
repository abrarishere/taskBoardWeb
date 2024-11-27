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
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!isMain) {
    // if not main route get id from url
    defaultTaskBoardId = window.location.pathname.split("/")[1];
  }

  const getUserTasks = async () => {
    try {
      let taskBoardId = Cookies.get("taskBoard");

      if (!taskBoardId) {
        console.warn(
          "No taskBoardId found in cookies. Using default task board ID..."
        );
        taskBoardId = defaultTaskBoardId;
        console.warn("Default task board ID:", taskBoardId);
      }

      const res = await axios.get(`${apiUrl}/task-board/${taskBoardId}/tasks`);

      if (res.data) {
        setTasks(res.data);
      }
    } catch (error) {
      console.error("Error fetching task board:", error);
    }
  };

  const createTaskBoard = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/task-board`,
        {},
        { withCredentials: true }
      );
      console.log("Response from createTaskBoard API:", res);
      if (res.status === 201 && res.data._id) {
        Cookies.set("taskBoard", res.data._id, {
          expires: 15,
          path: "/",
        });
        console.log("TaskBoardId stored in cookie:", res.data._id);
        await getUserTasks();
      } else {
        console.error("API did not return a valid taskBoardId:", res.data);
        return;
      }
    } catch (error) {
      console.error("Error creating task board:", error);
    }
  };

  const renameTaskBoard = async () => {
    const newTitle = prompt("Enter new title for task board:", taskBoardTitle);
    if (newTitle) {
      try {
        const res = await axios.put(
          `${apiUrl}/task-board/${defaultTaskBoardId}`,
          {
            title: newTitle,
          }
        );
        if (res.data) {
          setTaskBoardTitle(res.data.title);
        }
      } catch (error) {
        console.error("Error renaming task board:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await getUserTasks();
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const getTaskBoard = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/task-board/${defaultTaskBoardId}`
        );
        if (res.data) {
          setTaskBoardTitle(res.data.title);
        }
      } catch (error) {
        console.error("Error fetching task board:", error);
      }
    };
    getTaskBoard();
  }, [defaultTaskBoardId]);

  return (
    <div className="w-full flex flex-col py-12 items-start gap-8 min-h-screen max-w-[500px] mx-auto">
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 items-center justify-center">
          <img src={LogoIcon} alt="Logo" />
          <h1 className="text-[2.5rem] font-regular">{taskBoardTitle}</h1>
          <img src={EditDuoTone} alt="Pencil Icon" onClick={renameTaskBoard} />
        </div>
        <p className="font-regular text-[1rem] pl-12">
          Tasks to keep organised
        </p>
      </div>
      <Tasks tasks={tasks} />
    </div>
  );
};

export default MainTaskBoard;
