import Equip from "../models/Equips";

export const home = async (req, res) => {
  try {
    const equips = await Equip.find({}).sort({ createAt: "desc" });
    return res.render("home", { pageTitle: "Home", equips });
  } catch {
    return res.render("server-error");
  }
};

export const see = async (req, res) => {
  const { id } = req.params;
  const equips = await Equip.findById(id);
  if (!equips) {
    return res.render("404", { pageTitle: "Equip not found." });
  }
  return res.render("see", { pageTitle: equips.name, equips });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const equips = await Equip.findById(id);
  if (!equips) {
    return res.status(404).render("404", { pageTitle: "Equip not found." });
  }
  return res.render("edit", { pageTitle: `Editing: ${equips.name}`, equips });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { name, description, manufacturer, place, code, hashtags } = req.body;
  const equips = await Equip.exists({ _id: id });
  if (!equips) {
    return res.status(404).render("404", { pageTitle: "Equip not found." });
  }
  await Equip.findByIdAndUpdate(id, {
    name,
    description,
    manufacturer,
    place,
    code,
    hashtags: Equip.formatHashtags(hashtags),
  });
  return res.redirect(`/equip/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { name, description, manufacturer, place, code, hashtags } = req.body;
  try {
    await Equip.create({
      name,
      description,
      manufacturer,
      place,
      code,
      hashtags: Equip.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Equip",
      errorMessage: error._message,
    });
  }
};

export const deleteEquip = async (req, res) => {
  const { id } = req.params;
  await Equip.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let equips = [];
  if (keyword) {
    equips = await Equip.find({
      name: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", equips });
};
