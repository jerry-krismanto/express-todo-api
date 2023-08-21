const express = require("express");
const router = express.Router();
const helper = require(__class_dir + "/helper.class.js");
const m$user = require(__module_dir + "/user.module.js");

router.post("/", async function (req, res, next) {
  const addUser = await m$user.add(req.body);
  helper.sendResponse(res, addUser);
});

router.post("/login", async function (req, res, next) {
  const login = await m$user.login(req.body.username, req.body.password);
  helper.sendResponse(res, login);
});

router.get("/", async function (req, res, next) {
  const getUser = await m$user.get(req.body);
  helper.sendResponse(res, getUser);
});

router.put("/", async function (req, res, next) {
  const updateUser = await m$user.update(req.body);
  helper.sendResponse(res, updateUser);
});

router.delete("/", async function (req, res, next) {
  const deleteUser = await m$user.delete(req.body);
  helper.sendResponse(res, deleteUser);
});

module.exports = router;
