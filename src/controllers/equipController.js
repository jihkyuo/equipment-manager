import Equip from "../models/Equips";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const equips = await Equip.find({})
      .sort({ createAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", equips });
  } catch {
    return res.render("server-error");
  }
};

export const see = async (req, res) => {
  const { id } = req.params;
  const equips = await Equip.findById(id).populate("owner");
  if (!equips) {
    return res.render("404", { pageTitle: "Equip not found." });
  }
  return res.render("see", { pageTitle: equips.name, equips });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const equips = await Equip.findById(id);
  if (String(req.session.user._id) !== String(equips.owner)) {
    return res.status(403).redirect("/");
  }
  if (!equips) {
    return res.status(404).render("404", { pageTitle: "Equip not found." });
  }
  return res.render("edit", { pageTitle: `Editing: ${equips.name}`, equips });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { name, description, manufacturer, place, code, hashtags } = req.body;
  const equips = await Equip.findById(id);
  if (!equips) {
    return res.status(404).render("404", { pageTitle: "Equip not found." });
  }
  console.log(equips);
  if (String(req.session.user._id) !== String(equips.owner)) {
    return res.status(403).redirect("/");
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
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { name, description, manufacturer, place, code, hashtags } = req.body;
  try {
    const newEquip = await Equip.create({
      name,
      description,
      fileUrl,
      manufacturer,
      place,
      code,
      owner: _id,
      hashtags: Equip.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.equips.push(newEquip._id);
    await user.save();
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
  const equips = await Equip.findById(id);
  if (!equips) {
    return res.status(404).render("404", { pageTitle: "Equip not found." });
  }
  if (String(req.session.user._id) !== String(equips.owner)) {
    return res.status(403).redirect("/");
  }
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
