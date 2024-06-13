import React, { useState } from "react";
import GenericButton from "../GenericButton/GenericButton";
import { postRequest } from "../../api/api";
import { Pages } from "../../common/common.enums";

const RegisterPage: React.FC<{ navigateToPage: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async () => {
    try {
      await postRequest("auth/sign-up", { email, password, name, roleId: 2 });
      navigateToPage(Pages.AUTH);
    } catch (error) {}
  };

  return (
    <div className="sign-in">
      <h3>Register</h3>
      <div className="inputs" style={{ marginBottom: "84px" }}>
        <div className="input-item">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
        <GenericButton title="Register" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterPage;
