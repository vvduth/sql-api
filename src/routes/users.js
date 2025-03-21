const express = require("express");
const UserRepo = require("../repos/user-repo");

const router = express.Router();

router.get("/users", async (req, res) => {
  const user = await UserRepo.find();

  res.send(user);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.findById(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.post("/users", async (req, res) => {
  const { username, bio } = req.body;

  await UserRepo.insert(username, bio);

  res.sendStatus(200);
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await UserRepo.delete(id);
    if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
});

module.exports = router;
