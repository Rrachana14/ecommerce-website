const User = require("../models/User");

exports.getTopLocations = async (req, res) => {
  try {
    const topLocations = await User.aggregate([
      { $group: { _id: "$address.city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMonthlyRegistrations = async (req, res) => {
  try {
    const monthlyData = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(monthlyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id); // Logs the user ID from the token
    const user = await User.findById(req.user.id).select("username");
    if (!user) {
      console.log("No user found in the database for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user);
    return res.status(200).json({ username: user.username });
  } catch (err) {
    console.error("Error fetching the user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
