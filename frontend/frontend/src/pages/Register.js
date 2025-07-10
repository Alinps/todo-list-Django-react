// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from '../api/axios';

// export default function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('register/', { username, password });
//       alert("Registration successful");
//       navigate('/login');
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input type="text" placeholder="Username" className="form-control mb-2" value={username} onChange={e => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={e => setPassword(e.target.value)} />
//         <button className="btn btn-success btn-block">Register</button>
//       </form>
//       <p className="mt-2">Already have an account? <Link to="/login">Login</Link></p>
//     </div>
//   );
// }




import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('register/', { username, password });
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

