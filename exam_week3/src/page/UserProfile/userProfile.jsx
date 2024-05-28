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
  const [isSending, setIsSending] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  // console.log("updated user data", updatedUserData)

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
    dispatch(updateField({ name: fieldName, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    updatedUserData.username = `${updatedUserData.name.firstname} ${updatedUserData.name.lastname}`;
    dispatch(updateUser(updatedUserData));
    saveUserDataToLocalStorage(updatedUserData);
  };

  return (
    <div className="content-user-profile">
      <h2>Hi {updatedUserData.name.firstname}!</h2>
      <h3>Customize your profile here</h3>
      <form className="content-form">
        <label htmlFor={"firstname"}>
          Your firstname :
          <input
            className="input-form-user-profile"
            type="text"
            value={updatedUserData.name.firstname}
            onChange={handleChange}
            name="firstname"
            id="firstname"
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
          />
        </label>
        {isSending === true ? <p>Data saved</p> : null}
        <Button onClick={handleSubmit} text="Save"/>
      </form>
    </div>
  );
};

export default UserProfile;
