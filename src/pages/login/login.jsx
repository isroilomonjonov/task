import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./login.module.css";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import http from "../../utils/axios-instance";
import AppContext from "../../context/AppContext";
import EyeHideIcon from "../../assets/icons/eye-hide";
const schema = yup.object().shape({
  _username: yup.string().trim().required("Username bo'sh bo'lishi mumkin emas"),
  _password: yup.string().trim().required("Parol bo'sh bo'lishi mumkin emas"),
  _subdomain: yup
    .string()
    .trim()
    .required("Subdomain bo'sh bo'lishi mumkin emas"),
});

function Login() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [typeState, setTypeState] = useState(false);
  const typeChangeHandler = () => {
    setTypeState(!typeState);
  };
  const login = async (data) => {
	console.log(data);
    try {
      localStorage.setItem("subdomain", data._subdomain);
      const res = await http({
        url: "/security/auth_check",
        method: "POST",
		headers:{"content-type": "application/x-www-form-urlencoded"},
        data,
      });
      localStorage.setItem("token", res.data.token);
      ctx.setAppData({
        token: localStorage.getItem("token"),
        isAuth: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["right-page"]}>
        <div className={styles["right-page-main-content"]}>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(login)}>
            <div>
              <label htmlFor="username">Login</label>
              <input
                style={{ borderBottom: errors._username && "1px solid red" }}
                type="text"
                id="username"
                name="username"
                {...register("_username")}
              />
              {errors._username && (
                <span style={{ color: "red" }}>{errors._username.message}</span>
              )}
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Parol</label>
              <div>
                <div className={styles.spandiv}>
                  <div className={styles.changeType}>
                    <div onClick={typeChangeHandler}>
                      {typeState ? <PasswordIcon /> : <EyeHideIcon />}
                    </div>
                  </div>
                </div>
                <input
                  style={{ borderBottom: errors._password && "1px solid red" }}
                  type={typeState ? "text" : "password"}
                  name="password"
                  id="password"
                  {...register("_password")}
                />
              </div>

              {errors._password && (
                <span style={{ color: "red" }}>{errors._password.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="subdomain">Subdomain</label>
              <input
                style={{ borderBottom: errors._subdomain && "1px solid red" }}
                type="text"
                id="subdomain"
                name="subdomain"
                {...register("_subdomain")}
              />
              {errors._subdomain && (
                <span style={{ color: "red" }}>{errors._subdomain.message}</span>
              )}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button className={styles.buttonLogin} type="submit">
                Kirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
