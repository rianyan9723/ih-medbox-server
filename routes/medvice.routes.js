const router = require("express").Router();
const Medication = require("../models/Medication.model")
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/medication", async (req, res) => {
  try {
    const response = await Medication.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/medication/add", async (req, res) => {
  try {
    const { name, quantity, purpose, usage, dosage, expiryDate, otherInfo } = req.body;
    if (!name || !quantity || !purpose || !usage || !dosage || !expiryDate) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Medication.create({ name, quantity, purpose, usage, dosage, expiryDate, otherInfo });
    console.log(response)
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.delete("/medication/:_id", async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params._id);
    res
      .status(200)
      .json({ message: `Medication with id ${req.params._id} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/medication/:_id", async (req, res) => {
  try {
    const response = await Medication.findById(req.params._id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/medication/:_id", async (req, res) => {
  try {
    const { name, quantity, purpose, usage, dosage, expiryDate, otherInfo } = req.body;
    const response = await Medication.findByIdAndUpdate(
      req.params._id,
      {
        name,
        quantity,
        purpose,
        usage,
        dosage,
        expiryDate,
        otherInfo
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
