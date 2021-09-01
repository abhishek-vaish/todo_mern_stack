export const register = async (user) => {
  return await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (user) => {
  return await fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signout = async () => {
  localStorage.removeItem("validationToken");

  return await fetch(`${process.env.REACT_APP_BACKEND_URL}/signout`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem("validationToken")) {
    return localStorage.getItem("validationToken");
  } else {
    return false;
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("validationToken", data);
    next();
  }
};

export const decoder = (token) => {
  const arr = token.split(".");
  return atob(arr[1]);
};

export const deleteTodo = async (userId, todoId) => {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/deleteReminder/${todoId}/${userId}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createTodo = async (todo, userId) => {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/addReminder/${userId}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
