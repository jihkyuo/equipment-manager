export const getLogin = (req, res) => {
  res.send("login");
};

export const getJoin = (req, res) => {
  res.send("join");
};

export const getUserEdit = (req, res) => res.send("user Edit");

export const getLogout = (req, res) => res.send("user Logout");

export const removeUser = (req, res) => res.send("user remove");
