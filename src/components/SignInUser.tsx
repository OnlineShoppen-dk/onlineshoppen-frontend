import { FormEvent, ChangeEvent, useState } from "react";
import useRegister from "../hooks/useAuth";

const SignInUser = () => {
  const { login } = useRegister();
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = profile;

    login.mutateAsync({ email, password });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <label>
          Adgangskode:
          <input type="text" name="password" onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignInUser;
