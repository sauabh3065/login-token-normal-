// ./ it represents the current working directory(folder) and we can access all the files in that directory
// ../ it represents the parent working directory and we can access all the folder which is at simillar position

const UserModel = require("../models/user");
const Joi = require("Joi");
var md5 = require("md5");
const { Error } = require("mongoose");

exports.signup = async function (req, res) {
  try {
    let { name, email, mobile, password, country_code } = req.body;
    console.log(req.body);
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      mobile: Joi.number().required(),
      password: Joi.string().required(),
      country_code: Joi.string().required(),
      name: Joi.string().required(),
    });

    const result = schema.validate(req.body, { abortEarly: true });
    if (result.error) {
      throw new Error(result.error);
    }

    password = md5(password);

    let checkEmail = await UserModel.findOne({email});

    if (checkEmail) throw new Error("User already registered!");

    let data = { name, email, mobile, password, country_code };
    console.log(data);
    let save_user = new UserModel(data);
    let newUser = await save_user.save();
    if (!newUser) {
      throw new Error("Unable to add details.");
    }

    res.status(200).json({ msg: "user created succeefully" });
  } catch (error) {
    res.status(403).json(error.message);
  }
};

 // ****************************************************************joi************************************************ //


exports.login = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().required(),
    });
    const result = schema.validate(req.body, { abortEarly: true });
    let { email, password, accessToken } = req.body;
    console.log(req.body); //
    password = md5(password);
    let checkUser = await UserModel.findOne({ email, password });
    if (checkUser) {
      accessToken = generateToken(12);
      checkUser = await UserModel.findOneAndUpdate(
        { _id: checkUser._id },
        { accessToken },
        { new: true }
      );
      res
        .status(200)
        .json({ msg: "You Logged in succes fully", userDetails: checkUser });
    } else {
      throw new Error("User credentials are not found");
    }
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
};

generateToken = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
