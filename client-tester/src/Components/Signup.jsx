import { useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    axios
      .post("http://localhost:8000/auth/signup", {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  return (
    <div className="col-md-6 ms-4">
      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}
      <form>
        <div className="form-group">
          <label htmlFor="Firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="Firstname"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="from-group">
          <label htmlFor="Lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="Lastname"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          {" "}
          Daftar{" "}
        </button>
      </form>

      {data && (
        <div className="mt-5">
          <h4>Response Daftar</h4>
          <ReactJson src={data} />
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              setData(null);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
