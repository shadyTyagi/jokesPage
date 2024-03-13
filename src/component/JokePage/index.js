import "./index.css";
import React from "react";

const JokesPage = (props) => {
  const { jokesPageData, setIsTrue } = props;

  const onClickLogout = () => {
    setIsTrue(false);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Jokes
          </a>
          <button
            onClick={onClickLogout}
            type="button"
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <ul className="list-group mt-4">
              {jokesPageData.map((eachJoke) => (
                <div className="joke-card">
                  <h1 className="joke-category">
                    Category:{" "}
                    <span className="category-name">{eachJoke.category}</span>
                  </h1>
                  <li key={eachJoke.id} className="mb-2 list-group-item">
                    {eachJoke.joke}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JokesPage;
