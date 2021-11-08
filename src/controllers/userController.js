import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, email, username, password, location } = req.body;
  await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const getUserEdit = (req, res) => res.send("user Edit");

export const getLogout = (req, res) => res.send("user Logout");

export const removeUser = (req, res) => res.send("user remove");
