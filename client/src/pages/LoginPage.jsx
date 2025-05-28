import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import "./LoginPage.css";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  },[isAuthenticated, navigate])

  return (
    <div className="container">
      <div className="form-container">
        {Array.isArray(signinErrors) &&
          signinErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}

        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="error">Email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />
          {errors.password && <p className="error">Password es requerido</p>}

          <button type="submit" className="button">
            Login
          </button>
        </form>
        
        <p style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          No estás registrad@{' '}
          <Link to="/register" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
