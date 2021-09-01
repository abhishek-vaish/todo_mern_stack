import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import { register } from "../helper/helper";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (value) => (event) => {
    setUser({ ...user, [value]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    register(user)
      .then((res) => {
        localStorage.setItem("validationToken", res.token);
        history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register__form">
      <Form
        heading="Register User"
        description="Enter your credential to register on the todo application."
        value="Register"
        onClick={onSubmit}
        accountInfo="Already have an account? "
        accountLink="Login"
        link="/login"
      >
        <Input
          type="text"
          placeholder="First Name"
          onChange={handleChange("firstName")}
        />
        <br />
        <Input
          type="text"
          placeholder="Last Name"
          onChange={handleChange("lastName")}
        />
        <br />
        <Input
          type="email"
          placeholder="Email address"
          onChange={handleChange("email")}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
        />
        <br />
        <Input type="password" placeholder="Confirm Password" />
        <br />
      </Form>
    </div>
  );
};

export default Register;
