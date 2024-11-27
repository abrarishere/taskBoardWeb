import { Route, Routes } from "react-router-dom";
import MainTaskBoard from "./components/MainTaskBoard";
const App = () => {
  const defaultTaskBoardId = "6746f2937bdd8fddc1549a9c";
  return (
    <Routes>
      <Route
        path="/"
        element={<MainTaskBoard defaultTaskBoardId={defaultTaskBoardId} isMain={true}  />}
      />
      <Route
        path="/:id"
        element={<MainTaskBoard defaultTaskBoardId={defaultTaskBoardId} isMain={false}  />}
      />
    </Routes>
  );
};
  
export default App;
