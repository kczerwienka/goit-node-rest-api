import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

{
}

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const [contact] = await getContactById(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const [contact] = await removeContact(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.params;
  const contact = await addContact(name, email, phone);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
  });
};

export const updateContact = (req, res) => {
  const { id } = req.params[0];
  const [contact] = deleteContact(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  const { name, email, phone } = req.params;
  const updatedContact = addContact(id, name, email, phone);
  res.json({
    status: "success",
    code: 200,
    data: { updatedContact },
  });
};
