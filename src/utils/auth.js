export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    // you can add simple validation if you want
    if (!email || !password) {
      reject("Missing credentials");
      return;
    }

    resolve({
      token: "fake-jwt-token",
    });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("Invalid token");
      return;
    }

    resolve({
      name: "Arielle",
      email: "arielle@example.com",
      _id: "fake-user-id",
    });
  });
};
