import useRegister from "../hooks/useRegister";
import { useState } from "react";
import { v4 } from "uuid";

const Register = () => {
  const { registerUser,registerUserDetails } = useRegister();
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const guid = v4();
  const { email, password, firstName, lastName, phoneNumber } = profile;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser.mutateAsync({ email, password, guid });
    registerUserDetails.mutateAsync({ guid,firstName, lastName, email, phoneNumber });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
