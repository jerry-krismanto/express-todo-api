const express = require("express");
const router = express.Router();
const helper = require(__class_dir + "/helper.class.js");
const m$task = require(__module_dir + "/task.module.js");
const auth = require(__class_dir + "/auth.class.js");

router.use(auth.authenticateToken);

router.post("/", async function (req, res, next) {
  const addTask = await m$task.add(req.body);
  helper.sendResponse(res, addTask);
});

router.delete("/", async function (req, res, next) {
  const removeTask = await m$task.remove(req.body);
  helper.sendResponse(res, removeTask);
});

router.put("/", async function (req, res, next) {
  const updateTask = await m$task.update(req.body);
  helper.sendResponse(res, updateTask);
});

router.get("/", async function (req, res, next) {
  const getTask = await m$task.get(req.body);
  helper.sendResponse(res, getTask);
});

module.exports = router;
