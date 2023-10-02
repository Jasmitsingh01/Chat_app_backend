const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Singup = async (req, res) => {
  const { Email, Password, Contact } = req.body;
  if (Email && Password && Contact) {
    const Salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(Password, Salt);

    const Data = new User({
      Eamil: Email,
      Password: Hash,
      contact_No: Contact,
    });
    const Save = await Data.save();
    const Token = jwt.sign(Save, process.env.jwt_screct_key);
    res.send({
      operation: "true",
      Token: Token,
    });
  } else {
    res.send({
      operation: "false",
    });
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  if (Email && Password) {
    const Find = await User.findOne({ Eamil: Email });
    if (Find) {
      const Check = bcrypt.compare(Password, Find.Password);
      if (Check) {
        const Token = jwt.sign(
          {
            id: Find.id,
            Email: Find.Eamil,
            Password: Find.Password,
            Contact: Find.contact_No,
          },
          process.env.jwt_screct_key
        );
        res.send({
          operation: "true",
          Token: Token,
        });
      }
      else{
        res.send({
          operation: "false",
          messsage:'Password incorrect'
        });
      }
    }
    else{
      res.send({
        operation: "false",
        messsage:'Please Singup First'
      });
    }
  }
};
module.exports = { Singup, Login };
