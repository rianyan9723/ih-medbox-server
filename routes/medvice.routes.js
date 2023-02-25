const router = require("express").Router();
const Medication = require("../models/Medication.model")
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/medvice", async (req, res) => {
  try {
    const response = await Medication.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/medication/add", async (req, res) => {
  try {
    const { name, quantity, usage, expiryDate } = req.body;
    if (!name || !quantity || !usage || !expiryDate) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Medication.create({ name, quantity, usage, expiryDate });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});


router.post("/search", async (req, res, next) => {
  try {
    const { searchTerm: searchInput } = req.body;
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=indications_and_usage:${searchTerm}`
    );
    res.json(response.data.results);
  } catch (error) {
    next(error);
  }
});

router.delete("/medication/:medicationID", async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.medicationID);
    res
      .status(200)
      .json({ message: `Medication with id ${req.params.medicationID} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/medication/:medicationID", async (req, res) => {
  try {
    const response = await Medication.findById(req.params.medicationID);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/medication/:medicationID", async (req, res) => {
  try {
    const { name, quantity, usage, expiryDate } = req.body;
    const response = await Medication.findByIdAndUpdate(
      req.params.medviceID,
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
