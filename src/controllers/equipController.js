export const home = (req, res) => res.send("헬로우");

export const see = (req, res) => {
  console.log(req.params);
  return res.send("See 장비");
};

export const getEdit = (req, res) => {
  return res.send("edit 장비");
};

export const removeEquip = (req, res) => res.send("remove 장비");

export const search = (req, res) => res.send("Search 장비");

export const createEquip = (req, res) => res.send("Create 장비");
