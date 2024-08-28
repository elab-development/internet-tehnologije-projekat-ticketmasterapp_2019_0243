import React, { useState } from "react";
import "./SignIn.css";
import GenericButton from "../GenericButton/GenericButton";
import { postRequest } from "../../api/api";
import { useAuthContext } from "../../context/auth-context";
import { Pages } from "../../common/common.enums";

const SignInPage: React.FC<{ navigateToPage: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { setTokensOnLogin } = useAuthContext();

  const handleSubmit = async () => {
    try {
      const data = await postRequest("auth/sign-in", { email, password });
      setTokensOnLogin(data.accessToken, data.refreshToken);
      navigateToPage(Pages.EVENTS);
    } catch (error) {}
  };

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
        <GenericButton title="Sign in" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SignInPage;
