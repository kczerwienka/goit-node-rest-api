import { Contacts } from "../services/contactsServices.js";

export const Controllers = {
  getAllContacts: (req, res) => {
    const contacts = Contacts.listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  },

  getOneContact: (req, res) => {
    const { id } = req.params;
    const contact = Contacts.getContactById(id);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  },

  deleteContact: (req, res) => {
    const { id } = req.params;
    const contact = Contacts.removeContact(id);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  },

  createContact: (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing required name, email or phone field",
      });
      return;
    }
    const contact = Contacts.addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  },

  updateContact: (req, res) => {
    const { id } = req.params;
    const existingContact = Contacts.getContactById(id);
    if (!existingContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields to update",
      });
      return;
    }
    const updatedContact = { ...existingContact };
    if (name) updatedContact.name = name;
    if (email) updatedContact.email = email;
    if (phone) updatedContact.phone = phone;

    Contacts.removeContact(id);
    Contacts.addContact(
      updatedContact.name,
      updatedContact.email,
      updatedContact.phone
    );

    res.json({
      status: "success",
      code: 200,
      data: { updatedContact },
    });
  },
};
