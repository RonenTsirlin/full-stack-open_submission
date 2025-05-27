const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    required: true,
  },
  number: {
    type: String,
    validator: function (v) {
      // Check overall structure: two parts separated by one dash
      if (!/^\d{2,3}-\d+$/.test(v)) return false;

      // Ensure total length (excluding the dash) is >= 8
      const [part1, part2] = v.split("-");
      const totalLength = part1.length + part2.length;
      return totalLength >= 8;
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
