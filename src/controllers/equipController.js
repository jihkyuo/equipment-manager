let equips = [
  { name: "refriger", code: "RES-EA-IA-131", place: "W센터", views: 10, id: 1 },
  { name: "청소기", code: "RES-EA-IA-131", place: "W센터", views: 5, id: 2 },
  { name: "컴퓨터", code: "RES-EA-IA-131", place: "W센터", views: 1, id: 3 },
];

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home", equips });
};

export const see = (req, res) => {
  const { id } = req.params;
  const equip = equips[id - 1];
  return res.render("see", { pageTitle: `Managing: ${equip.name}`, equip });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const equip = equips[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${equip.name}`, equip });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const equip = equips[id - 1];
  equip.name = name;
  return res.redirect(`/equip/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const { name } = req.body;
  const newEquip = {
    name,
    code: "RES-EA-IA-131",
    place: "W센터",
    views: 10,
    id: equips.length + 1,
  };
  equips.push(newEquip);
  return res.redirect("/");
};

export const removeEquip = (req, res) => res.send("remove 장비");

export const search = (req, res) => res.send("Search 장비");

export const createEquip = (req, res) => res.send("Create 장비");
