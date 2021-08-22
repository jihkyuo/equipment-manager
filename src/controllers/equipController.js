export const home = (req, res) => {
  const equips = [];
  return res.render("home", { pageTitle: "Home", equips });
};

export const see = (req, res) => {
  return res.render("see", { pageTitle: "See" });
};

export const getEdit = (req, res) => {
  return res.send("edit 장비");
};

export const removeEquip = (req, res) => res.send("remove 장비");

export const search = (req, res) => res.send("Search 장비");

export const createEquip = (req, res) => res.send("Create 장비");
