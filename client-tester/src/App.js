import Login from "./Components/Login";
import SignUp from "./Components/Signup";

function App() {
  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      style={{ height: "100vh" }}
    >
      <div className="row w-100"></div>
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
