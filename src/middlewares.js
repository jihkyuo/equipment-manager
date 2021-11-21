import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  res.locals.siteName = "Equip";
  console.log("local에 담은 user의 세션", res.locals);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  // 사용자가 로그인되어 있지않은 것을 감지하면 로그인페이지로 리다이렉트
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  // 로그인된 사용자가 로그인페이지 같은 페이지에 방문할 경우
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
