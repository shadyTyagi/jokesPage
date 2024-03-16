import React, { useState, useEffect } from "react";
import JokesPage from "../JokePage";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
  });

  useEffect(() => {
    const getJokesData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });
      const url =
        "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10";
      const response = await fetch(url);
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok === true) {
        setApiResponse((prevApiDetails) => ({
          ...prevApiDetails,
          status: apiStatusConstants.success,
          data: responseData,
        }));
      } else {
        setApiResponse((prevApiDetails) => ({
          ...prevApiDetails,
          status: apiStatusConstants.failure,
        }));
      }
    };
    getJokesData();
  }, []);

  const renderSuccessView = () => {
    const { data } = apiResponse;
    const formatedJokeData = data.jokes.map((eachJoke) => ({
      category: eachJoke.category,
      type: eachJoke.type,
      id: eachJoke.id,
      joke: eachJoke.joke,
    }));
    return <JokesPage setIsTrue={setIsTrue} jokesPageData={formatedJokeData} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyEmail = "rajat@gmail.com";
    const dummyPassword = "rajattyagi";
    if (email !== dummyEmail || password !== dummyPassword) {
      setError("Invalid email or password");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
    setEmail("");
    setPassword("");
    setError("");
    setIsTrue(true);
  };

  return (
    <>
      {isTrue ? (
        renderSuccessView()
      ) : (
        <div className="bg-container">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="dummy-card d-flex justify-content-center flex-column">
                <h1 className="dummy-details">
                  Email: <span className="dummy">rajat@gmail.com</span>
                </h1>
                <h1 className="dummy-details">
                  Password: <span className="dummy">rajattyagi</span>
                </h1>
              </div>
              <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    {error && (
                      <p style={{ color: "red" }} className="mt-2">
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
