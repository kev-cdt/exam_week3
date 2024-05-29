import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUser,
  updateField,
} from "../../store/slice/userProfileSlice";
import { user } from "../../store/selector/selector";
import Button from "../../component/Button/button";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  //   console.log("user data", userData)
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [validation, setValidation] = useState(false)

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

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
    setValidation(false);
    dispatch(updateField({ name: fieldName, value }));
  };

  const handleResetForm = (e) => {
  e.preventDefault();
  setUpdatedUserData(userData)
  // setValidation(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setValidation(true)
    updatedUserData.username = `${updatedUserData.name.firstname} ${updatedUserData.name.lastname}`;
    dispatch(updateUser(updatedUserData));
    saveUserDataToLocalStorage(updatedUserData);
  };

  return (
    <div className="content-user-profile">
      <h2>Hi {updatedUserData.name.firstname}!</h2>
      <h3>Customize your profile here</h3>
      <form className="content-form" onSubmit={handleSubmit}>
        <label htmlFor={"firstname"}>
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
        <label htmlFor={"lastname"}>
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
        <label htmlFor={"email"}>
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
        {validation === true ?  <p className="validation-message">Data saved</p>: ""}
        <div className="position-buttons-form">
        <Button onClick={handleResetForm} text="Reset"/>
        <Button type="submit" text="Save"/>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
