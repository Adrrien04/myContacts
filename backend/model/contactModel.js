const mongoose = require("mongoose");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const phoneNumber = parsePhoneNumberFromString(v);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  email: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);
