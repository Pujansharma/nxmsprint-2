const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usermodel } = require("../model/user.modal");
require("dotenv").config()
const userrouter = express.Router();



//sing up routes--------------------------------------------------

userrouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let users = await usermodel.findOne({ email: email });
        if (users) {
            res.status(200).send({ msg: "user allready present please login !" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const main = new usermodel({
                    name,
                    email,
                    password: hash,
                    role
                })
                await main.save();
                console.log(main)
                res.status(200).send({ msg: "user register succesfully" })
            })
        }
    } catch (error) {
        console.log(error.message);
        res.send(400).send({ msg: "somethinng went wrong" })
    }
});

//login routes-------------------------------------------------

userrouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await usermodel.findOne({ email });
        if (user) {
            let hashpass = user.password;
            bcrypt.compare(password, hashpass, async (err, result) => {
                if (err) {
                    res.status(400).send("somethings went wrong")
                } else if (result) {
                    var maintoken = jwt.sign({ userID: user._id, userrole: user.role },process.env.jwtmaintoken, { expiresIn: "1m" })
                    var Refreshtoken = jwt.sign({ userID: user._id, userrole: user.role }, process.env.Refreshtoken, { expiresIn: "3m" });
                    res.status(200).send({ mssg: "login succesfull", maintoken: maintoken, Refreshtoken: Refreshtoken })
                } else {
                    res.status(400).send({ mssg: "wrong credaintail" })
                }
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send("something went wrong")
    }
})


//refresh token-----------------------------------------------

userrouter.get("/refresh-token", async (req, res) => {
    let Refreshtoken = req.headers.authorization?.split(" ")[1];
    if (!Refreshtoken) {
        res.status(200).send("please login again !");
    } else {
        jwt.verify(Refreshtoken, process.env.Refreshtoken, async (err, decode) => {
            if (err) {
                console.log(err)
            } else if (decode) {
                let user = decode;
                var maintoken = jwt.sign({ userID: user._id, userrole: user.role }, process.env.jwtmaintoken, { expiresIn: "1m" }) ;
                res.status(200).send({ mssg: "login succesfull", maintoken: maintoken})
            }else{
                console.log("err")
                res.send({msg:"login again"})
            }


        })
    }
})


module.exports = { userrouter }