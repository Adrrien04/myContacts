const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Contact = require("./contactModel");

dotenv.config();

describe("Contact Model - Phone Validation", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should validate a valid phone number", async () => {
    const validContact = new Contact({
      user: new mongoose.Types.ObjectId(),
      firstName: "John",
      lastName: "Doe",
      phone: "+14155552671",
    });

    const savedContact = await validContact.save();
    expect(savedContact.phone).toBe("+14155552671");

    await Contact.deleteOne({ _id: savedContact._id });
  });

  it("should reject an invalid phone number", async () => {
    const invalidContact = new Contact({
      user: new mongoose.Types.ObjectId(),
      firstName: "Jane",
      lastName: "Doe",
      phone: "12345",
    });

    await expect(invalidContact.save()).rejects.toThrow(
      /is not a valid phone number/,
    );
  });
});
