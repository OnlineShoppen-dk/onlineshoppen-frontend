import { useRegister } from '../hooks/useRegister';
import { useState } from 'react';
import {v4} from 'uuid';

const Register = () => {
 const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { register } = useRegister(); 
const guid = v4()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(email, password, guid)
};

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button    type="submit">Register</button>

      </form>
    </div>
  );
};

export default Register;
