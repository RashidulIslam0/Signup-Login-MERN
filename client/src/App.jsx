import Login from "./component/Login";
import Main from "./component/Main";
import Singup from "./component/Singup";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Singup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>{" "}
    </>
  );
}

export default App;
