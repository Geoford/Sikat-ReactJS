import React from "react";

const AddingModeratorForm = () => {
  return (
    <div>
      <h5 className="m-0 mb-2">Add new Moderator</h5>
      <form className="d-flex flex-column gap-1">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="mod-firstName"
            placeholder="First Name"
            autoComplete="new-firstName"
          />
          <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="mod-lastName"
            placeholder="Last Name"
            autoComplete="new-lastName"
          />
          <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="email"
            name="mod-email"
            placeholder="name@example.com"
            autoComplete="new-email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            email="mod-password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <label for="floatingPassword">Password</label>
        </div>
      </form>
    </div>
  );
};

export default AddingModeratorForm;
