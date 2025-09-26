// contacts.js/*
// Uncomment and assign a value
const fs = require("fs").promises;
const path = require("path");
// Uncomment and assign a value
const contactsPath = path.join(__dirname, "db", "contacts.json");

// async function listContacts() {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   //   console.log(data);
//   return JSON.parse(data);
// }

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// async function getContactById(contactId) {
//   return listContacts().then((contacts) => {
//     const contact = contacts.find((c) => c.id === contactId);
//     return contact || null;
//   });
// }

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
};

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((c) => c.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const [removed] = contacts.splice(idx, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return removed;
// }

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((c) => c.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removed] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removed;
};

// async function addContact(name, email, phone) {
//   const contacts = await listContacts();
//   // Generate a simple unique id (could use a library like uuid for production)
//   const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
//   const newContact = { id, name, email, phone };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  // Generate a simple unique id (could use a library like uuid for production)
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
