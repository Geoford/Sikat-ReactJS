import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function UserTable() {
  const [user_table, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/usertable")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-white">
      <div className="w-50  rounded">
        <Link to="/AddStudent" className="btn btn-success rounded">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Username</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {user_table.map((data, i) => (
              <tr key={i}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.cvsuEmail}</td>
                <td>{data.username}</td>
                <td>
                  <Link to="/Update/${data.ID}" className="btn btn-primary">
                    Update
                  </Link>
                  <button className="btn btn-danger ms-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
