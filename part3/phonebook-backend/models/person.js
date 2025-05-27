const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to MongoDB");
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
    validate: {
      validator: function (v) {
        // Check overall structure: two parts separated by one dash
        if (v.split("-").length !== 2) {
          return false;
        }

        const [part1, part2] = v.split("-");
        if (
          part1.length + part2.length < 8 ||
          part1.length > 3 ||
          part1.length < 2
        ) {
          return false;
        }
      },
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
