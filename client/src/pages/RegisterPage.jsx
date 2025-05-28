import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './RegisterPage.css';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="container">
      <div className="form-container">
        {RegisterErrors?.map((error, i) => (
          <div key={i} className="error-message">
            {error}
          </div>
        ))}

        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Registro
        </h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="input-field"
            placeholder="Username"
          />
          {errors.username && <p className="input-error">Usuario es requerido</p>}

          <input
            type="email"
            {...register("email", { required: true })}
            className="input-field"
            placeholder="Email"
          />
          {errors.email && <p className="input-error">Email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="input-field"
            placeholder="Password"
          />
          {errors.password && <p className="input-error">Password es requerido</p>}

          <button type="submit" className="button-submit">Registrar</button>
        </form>

        <p className="text-link-wrapper">
          Ya tienes una cuenta?
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
