import Contact from "../model/contactModel.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json({ success: true, contacts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Erreur serveur", err: err.message });
  }
};

export const addContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address } = req.body;
    if (!firstName || !lastName || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Champs obligatoires manquants" });
    }

    const newContact = new Contact({
      user: req.user.id,
      firstName,
      lastName,
      phone,
      email,
      address,
    });

    await newContact.save();
    res.status(201).json({ success: true, contact: newContact });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Erreur serveur", err: err.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact non trouvé" });

    res.json({ success: true, message: "Contact supprimé" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Erreur serveur", err: err.message });
  }
};
