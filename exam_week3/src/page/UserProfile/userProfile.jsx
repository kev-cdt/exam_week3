import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/selector/selector";
import {
  fetchUser,
  updateUser,
  updateField,
} from "../../store/slice/userProfileSlice";
import Button from "../../component/Button/button";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [validation, setValidation] = useState(null);

  const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;

    if (fieldName === "firstname" || fieldName === "lastname") {
      const updatedName = { ...updatedUserData.name, [fieldName]: value };
      setUpdatedUserData({
        ...updatedUserData,
        name: updatedName,
      });
    } else {
      setUpdatedUserData({
        ...updatedUserData,
        [fieldName]: value,
      });
    }
    setValidation(null);
    dispatch(updateField({ name: fieldName, value }));
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setUpdatedUserData(userData);
  };

  const resetMessage = () => {
    setTimeout(() => {
      setValidation(null);
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(updatedUserData) === JSON.stringify(userData)) {
      setValidation(false);
      resetMessage();
      return;
    }
    setValidation(true);
    updatedUserData.username = `${updatedUserData.name.firstname} ${updatedUserData.name.lastname}`;
    dispatch(updateUser(updatedUserData));
    saveUserDataToLocalStorage(updatedUserData);
    resetMessage();
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

  return (
    <div className="content-user-profile">

      <h2>Hi {updatedUserData.name.firstname}!</h2>
      <h3>Customize your profile here</h3>
      <form className="content-form" onSubmit={handleSubmit}>
        <label className="label-form-user" htmlFor={"firstname"}>
          Your firstname :
          <input
            className="input-form-user-profile"
            type="text"
            value={updatedUserData.name.firstname}
            onChange={handleChange}
            name="firstname"
            id="firstname"
            required
          />
        </label>
        <label className="label-form-user" htmlFor={"lastname"}>
          Your lastname :
          <input
            className="input-form-user-profile"
            type="text"
            value={updatedUserData.name.lastname}
            onChange={handleChange}
            name="lastname"
            id="lastname"
            required
          />
        </label>
        <label className="label-form-user" htmlFor={"email"}>
          Your email :
          <input
            className="input-form-user-profile"
            type="text"
            value={updatedUserData.email}
            onChange={handleChange}
            name="email"
            id="email"
            required
          />
        </label>
        <div className="position-buttons-form">
          <Button onClick={handleResetForm} text="Reset" />
          <Button type="submit" text="Save" />
        </div>
        {validation === true ? (
          <p className="validation-message">The data has been recorded</p>
        ) : validation === false ? (
          <p className="error-message">The data has not been modified</p>
        ) : null}
      </form>
    </div>
  );
};

export default UserProfile;