import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  // console.log(req.body);
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "입력한 Password가 일치하지 않습니다.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "입력한 username/email은 이미 있습니다.",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력한 username은 없습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "password가 일치하지 않습니다.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  // 전체 url : https://github.com/login/oauth/authorize?client_id=4fce6fbcc9818b98c747&allow_signup=false&scope=user:email read:user

  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  // fetch로 POST요청을 보내 data를 받아오고,
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json,",
      },
    })
  ).json();
  // 받아온 data를 json으로 추출한다.
  // const json = await data.json();

  if ("access_token" in tokenRequest) {
    // 위에서 받아온 access_token
    const { access_token } = tokenRequest;

    // 깃헙 api 요청 url 주소
    const apiUser = "https://api.github.com";

    // user의 정보를 가져오기 fetch로 요청하기
    const userData = await (
      await fetch(`${apiUser}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // user의 email정보를 불러오기 위해 fetch로 요청하기
    const emailData = await (
      await fetch(`${apiUser}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    //받아온 email 데이터 중 verified 이면서 primary인 것들 찾기
    const email = emailData.find(
      (e) => e.primary === true && e.verified === true
    );
    if (!email) {
      return res.redirect("/login");
    }
  } else {
    // 'access_token'이 없으면 로그인 페이지로 리다이렉트 됨. 추후에 로그인 안된 안내를 user에게 줘보도록 하자
    return res.redirect("/login");
  }
};

export const getUserEdit = (req, res) => res.send("user Edit");

export const getLogout = (req, res) => res.send("user Logout");

export const removeUser = (req, res) => res.send("user remove");
