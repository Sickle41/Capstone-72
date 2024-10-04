
export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/Users?email=${email}`).then((res) =>
    res.json()
    )
}

export const createUser = (user) => {
    return fetch("http://localhost:8088/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  };