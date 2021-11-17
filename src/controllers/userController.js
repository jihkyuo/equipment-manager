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
  const user = await User.findOne({ username, socialOnly: false });
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

    // console.log(userData);

    // user의 email정보를 불러오기 위해 fetch로 요청하기
    const emailData = await (
      await fetch(`${apiUser}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    //받아온 email 데이터 중 verified 이면서 primary인 것들 찾기
    const emailObj = emailData.find(
      (e) => e.primary === true && e.verified === true
    );

    // 찾은 email이 없을 때 리다이렉트 시킴
    if (!emailObj) {
      return res.redirect("/login");
    }

    // emailObj의 조건을 가진 email을 발견 했을 때
    let user = await User.findOne({ email: emailObj.email });
    // 로그인 시킴
    if (!user) {
      // 로그인 실패 -> 계정생성
      user = await User.create({
        name: userData.name ? userData.name : userData.login,
        username: userData.login,
        email: emailObj.email,
        avatarUrl: userData.avatar_url,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    // user를 찾을 경우 or 계정 생성 후 => 로그인 시키자
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // 'access_token'이 없으면 로그인 페이지로 리다이렉트 됨. 추후에 로그인 안된 안내를 user에게 줘보도록 하자
    return res.redirect("/login");
  }
};

export const getLogout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: `Edit ${res.locals.loggedInUser.name}의 Profile`,
  });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username, location },
  } = req;

  console.log(res.locals);

  const loggedInUserUsername = res.locals.loggedInUser.username;
  const loggedInUserEmail = res.locals.loggedInUser.email;

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (
    exists &&
    (username !== loggedInUserUsername || email !== loggedInUserEmail)
  ) {
    return res.status(400).render("edit-profile", {
      pageTitle: `Edit ${res.locals.loggedInUser.name}의 Profile`,
      errorMessage: "입력한 username/email은 이미 있습니다.",
    });
  }

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  // 세션 업뎃을 해줘야 view에서 보여짐
  req.session.user = updateUser;

  console.log(updateUser);

  res.redirect("/users/edit");
};
