const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as an argument.");
  process.exit(1);
}

let password = "";
let inputName = "";
let inputNumber = "";

if (process.argv.length > 3 && process.argv.length < 6) {
  password = process.argv[2];
  inputName = process.argv[3];
  inputNumber = process.argv[4];
} else {
  password = process.argv[2];
}

const url = `mongodb+srv://fullstack:${password}@phonebook.ygkka7r.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (inputName && inputNumber) {
  const person = new Person({
    name: inputName,
    number: inputNumber,
  });

  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((people) => {
    console.log("phonebook:");
    people.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
