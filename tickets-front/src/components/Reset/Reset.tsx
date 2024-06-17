import React, { useState } from "react";
import GenericButton from "../GenericButton/GenericButton";
import { postRequest } from "../../api/api";
import { Pages } from "../../common/common.enums";
import { useAuthContext } from "../../context/auth-context";

const ResetPasswordPage: React.FC<{
  navigateToPage: (page: Pages) => void;
}> = ({ navigateToPage }) => {
  const [oldPassword, setoldPassword] = useState<string>();
  const [newPassword, setPassword] = useState<string>();

  const { authState, clearTokensOnLogout } = useAuthContext();

  const handleSubmit = async () => {
    const userToUpdate = authState.email;

    try {
      const response = await postRequest("auth/reset-password", {
        user: userToUpdate,
        newPassword,
        oldPassword,
      });
      if (response === 1) {
        clearTokensOnLogout();
        navigateToPage(Pages.AUTH);
      }
    } catch (error) {}
  };

  return (
    <div className="sign-in">
      <h3>Reset password</h3>
      <div className="inputs">
        <div className="input-item">
          <label>Old password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
          ></input>
        </div>
        <div className="input-item">
          <label>New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="sign-in-actions">
        <GenericButton title="Reset password" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
