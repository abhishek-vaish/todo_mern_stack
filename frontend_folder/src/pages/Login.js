import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../components/Form";
import Header from "../components/Header";
import Input from "../components/Input";
import { authenticate, login } from "../helper/helper";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const [error, setError] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    login(user).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        authenticate(res, () => {
          localStorage.setItem("validationToken", res.token);
          history.push("/profile");
        });
      }
    });
  };

  const handleChange = (value) => (event) => {
    setUser({ ...user, [value]: event.target.value });
  };
  return (
    <div>
      <Header />
      <Form
        heading="Login User"
        description="Enter your credential to login the todo application."
        value="Login"
        onClick={onSubmit}
        accountInfo="Don't have an account? "
        accountLink="Signup"
        link="/"
      >
        {error ? (
          <p className="text-red-800">Invalid Email/Password</p>
        ) : (
          <div></div>
        )}
        <Input
          type="email"
          placeholder="Email"
          onChange={handleChange("email")}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
        />
      </Form>
    </div>
  );
};

export default Login;
