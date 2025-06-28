const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // React 앱 주소만 허용
    credentials: true, // 쿠키 포함 시 필요
  })
);

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  console.log("✅ /api/hello hit from client");
  res.send("hello react");
});

app.post("/api/users/register", async (req, res) => {
  try {
    console.log("register API ==============1");
    const user = new User(req.body);
    console.log("register API ==============2");
    await user.save();
    console.log("register API ==============3");

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    // 1. 이메일로 사용자 검색
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 비밀번호 비교
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // 3. 토큰 생성 및 응답
    const updatedUser = await user.generateToken();

    res
      .cookie("x_auth", updatedUser.token)
      .status(200)
      .json({ loginSuccess: true, userId: updatedUser._id });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ loginSuccess: false, error: err.message });
  }
});

// role 1 어드민    role 2 특정 부서 어드민
// role 0 -> 일반유저   role 0이 아니면  관리자
app.get("/api/users/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    console.log("req.user", req.user);

    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
