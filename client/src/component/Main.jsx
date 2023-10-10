import React from "react";

const Main = () => {
  const hendleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Logout</h2>
              <p className="card-text">Are you sure you want to log out?</p>
              {/* Logout Button */}
              <button
                to="#"
                onClick={hendleLogout}
                className="btn btn-danger"
                id="logoutBtn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <nav className="nav">
    //     <h1>facebook</h1>
    //     <button onClick={hendleLogout}>Logout</button>
    //   </nav>
    // </div>
  );
};

export default Main;
