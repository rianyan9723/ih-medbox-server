const router = require("express").Router();
const Medbox = require("../models/Medbox.model")
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/medbox", async (req, res) => {
  try {
    const response = await Medbox.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/medbox/add", async (req, res) => {
  try {
    const { name, quantity, usage, expiryDate } = req.body;
    if (!name || !quantity || !usage || !expiryDate) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Medbox.create({ name, quantity, usage, expiryDate });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.delete("/medbox/:medboxID", async (req, res) => {
  try {
    await Medbox.findByIdAndDelete(req.params.medboxID);
    res
      .status(200)
      .json({ message: `Medbox with id ${req.params.medboxID} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/medbox/:medboxID", async (req, res) => {
  try {
    const response = await Medbox.findById(req.params.medboxID);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/medbox/:medboxID", async (req, res) => {
  try {
    const { name, quantity, usage, expiryDate } = req.body;
    const response = await Medbox.findByIdAndUpdate(
      req.params.medboxID,
      {
        name,
        quantity,
        usage,
        expiryDate
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
  }
});

router.post("/upload", fileUpload.single("filename"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while returning the image path" });
  }
});

module.exports = router;
