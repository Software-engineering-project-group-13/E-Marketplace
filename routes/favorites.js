const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const CryptoJs = require("crypto-js");
const Favorite = require("../models/Favorites");

// CREATE

router.post("/:id/", verifyToken, async (req, res) => {
  const newFavorite = new Favorite(req.body);

  try {
    const savedFavorite = await newFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE;
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFavorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json("Favorites has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART

router.get("/find/:userId", async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.params.userId });
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
