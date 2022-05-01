import { useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";
import GoogleLogin from "react-google-login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    axios
      .post("http://localhost:8000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  const responseGoogle = (response) => {
    setData(null);
    axios
      .post("http://localhost:8000/auth/google-login", {
        googleId: response.googleId,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };
  const failuregoogle = (response) => {
    setErr("Login Google Gagal");
  };

  return (
    <div className="col-md-6">
      {err && (
        <div className="alert alert-danger" role="alert">
          {err}
        </div>
      )}
      <form>
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
          Masuk{" "}
        </button>
      </form>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENTID}
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={failuregoogle}
      />
      {data && (
        <div className="mt-5">
          <h4>Response Login</h4>
          <ReactJson src={data} />
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              setData(null);
              setEmail("");
              setPassword("");
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
