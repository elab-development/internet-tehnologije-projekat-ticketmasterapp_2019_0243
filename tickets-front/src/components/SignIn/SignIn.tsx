import React, { useState } from "react";
import "./SignIn.css";
import GenericButton from "../GenericButton/GenericButton";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = () => {};

  return (
    <div className="sign-in">
      <h3>Sign in</h3>
      <div className="inputs">
        <div className="input-item">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="input-item">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="sign-in-actions">
        <GenericButton title="Sign in" onClick={() => {}} />
      </div>
    </div>
  );
};

export default SignInPage;
