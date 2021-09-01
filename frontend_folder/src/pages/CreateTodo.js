import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "../components/Form";
import Header from "../components/Header";
import Input from "../components/Input";
import { createTodo } from "../helper/helper";
import useFetchUser from "../hooks/useFetchUser";
// import Check from "../assets/check.png";

const CreateTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    reminderDate: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { apiData } = useFetchUser();
  const userId = apiData._id;

  const onChange = (value) => (event) => {
    setTodo({ ...todo, [value]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await createTodo(todo, userId)
      .then(() => {
        return <Redirect to="/success" />;
      })
      .catch(() => {
        setError(true);
      });
    setSuccess(true);
  };

  /*
  TODO: 
    * When the todo is created set the success to true.
    * When the success set to true, change the ui to success message.
    * Wait for 2 seconds and redirect the page back to profile page.
    * Set the success back to false.
*/
  return (
    <div>
      <div className="relative z-index-10">
        <Header name={apiData.firstName[0]} />
        {success ? (
          <div></div>
        ) : (
          <div>
            <Form
              heading="Create Todo"
              description="Add the required fields to create your todo."
              value="Create Todo"
              onClick={onSubmit}
            >
              <Input
                type="text"
                onChange={onChange("title")}
                placeholder="Title*"
              />
              <Input
                type="text"
                onChange={onChange("description")}
                placeholder="Description"
              />
              <Input
                type="date"
                onChange={onChange("reminderDate")}
                placeholder="Reminder Date*"
              />
              {/* add user field is still needs to be in progress. */}
            </Form>
            {/* <div className="bg-gray-100 h-full absolute bottom-0 left-0 right-0 opacity-100">
                <div className="h-screen flex flex-col justify-center items-center">
                  <div className="w-100">
                    <img className="w-24 mb-6" src={Check} alt="success" />
                    <p className="text-2xl">Todo Successfully Created!!</p>
                  </div>
                </div>
              </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTodo;
