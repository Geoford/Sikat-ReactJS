const RegistrationForm = () => {
  const now = 35;
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="border-bottom pb-1 mb-2">
        <h3 className="m-0" style={{ color: "var(--primary)" }}>
          Create New Account
        </h3>
        <p className="m-0 text-secondary">
          Easily establish your account in just a few steps.
        </p>
      </div>
      {/* Personal Details - Step 1 */}
      {step === 1 && (
        <div
          className={`form-section active`}
          style={{ transition: "all 0.5s ease-in-out" }}
        >
          <h5>Personal Details</h5>
          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleInput}
                className="form-control rounded"
                value={values.firstName}
              />
              {errors.firstName && (
                <span className="text-danger"> {errors.firstName}</span>
              )}
            </div>
            <div className="col mb-3">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleInput}
                className="form-control rounded"
                value={values.lastName}
              />
              {errors.lastName && (
                <span className="text-danger"> {errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="alias"
              placeholder="Alias (for anonymity purposes)"
              onChange={handleInput}
              className="form-control rounded"
              value={values.alias}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="cvsuEmail"
              placeholder="CvSU Email"
              onChange={handleInput}
              className="form-control rounded"
              value={values.cvsuEmail}
            />
            {errors.cvsuEmail && (
              <span className="text-danger"> {errors.cvsuEmail}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="studentNumber"
              placeholder="Student Number"
              onChange={handleInput}
              className="form-control rounded"
              value={values.studentNumber}
            />
          </div>
        </div>
      )}

      {/* Account Details - Step 2 */}
      {step === 2 && (
        <div
          className={`form-section active`}
          style={{
            transform: `translateX(0)`,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <h5>Account Details</h5>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInput}
              className="form-control rounded"
              value={values.username}
              autoComplete="new-username"
            />
            {errors.username && (
              <span className="text-danger"> {errors.username}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              className="form-control rounded"
              value={values.password}
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInput}
              className="form-control rounded"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-danger"> {errors.confirmPassword}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="securityQuestion"
              placeholder="Security Question"
              className="form-control rounded"
              autoComplete="new-question"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="securityAnswer"
              placeholder="Security Answer"
              className="form-control rounded"
              autoComplete="new-answer"
            />
          </div>
        </div>
      )}

      {/* Security Details - Step 3 */}
      {step === 3 && (
        <div
          className={`form-section active`}
          style={{
            transform: `translateX(0)`,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <h5>Security Details</h5>
          <div>
            <p>OPT sent to email@email.com</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between">
        {step > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {step === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
