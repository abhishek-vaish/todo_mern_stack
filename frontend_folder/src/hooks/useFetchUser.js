import { useEffect, useState, useRef } from "react";
import { decoder } from "../helper/helper";

const useFetchUser = () => {
  // declare apiData to save the data coming from the api.
  const [apiData, setApiData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    todos_id: [],
  });
  // decode the JWT token.
  const user = useRef({});
  try {
    user.current.value = JSON.parse(
      decoder(localStorage.getItem("validationToken"))
    );
  } catch (err) {
    console.log(err);
  }
  // call the fetch funciton to make a get request to get the current user info.
  const fetchData = async () => {
    return await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getUser/${user.current.value._id}`,
      {
        method: "GET",
      }
    )
      .then((getUser) => {
        return getUser.json();
      })
      .then((data) => {
        setApiData({
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          todos_id: data.todos_id,
        }); // update the apiData variable
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return fetchData();
  }, []);
  return { apiData };
};

export default useFetchUser;
