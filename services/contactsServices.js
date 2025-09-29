// contacts.js/*
// Uncomment and assign a value
import fs from "node:fs";
import { nanoid } from "nanoid";

// Uncomment and assign a value
const contactsPath = "db/contacts.json";

export const Contacts = {
  __readContacts() {
    return JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf8" }));
  },

  __writeContacts(contacts) {
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  },

  listContacts() {
    return this.__readContacts();
  },

  getContactById(id) {
    const contacts = this.__readContacts();
    return contacts.find((contact) => contact.id === id) || null;
  },
  removeContact(id) {
    const contacts = this.__readContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    this.__writeContacts(contacts);
    return removedContact;
  },
  addContact(name, email, phone) {
    const contacts = this.__readContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    this.__writeContacts(contacts);
    return newContact;
  },
};
