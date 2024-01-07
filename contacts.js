import { promises as fsPromises } from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

async function listContacts() {
  try {
    const fileContent = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Błąd podczas wczytywania listy kontaktów:", error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || null;
  } catch (error) {
    console.error(
      `Błąd podczas wyszukiwania kontaktu o ID ${contactId}:`,
      error.message
    );
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Kontakt o ID ${contactId} został pomyślnie usunięty.`);
  } catch (error) {
    console.error(
      `Błąd podczas usuwania kontaktu o ID ${contactId}:`,
      error.message
    );
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    let contacts = await listContacts();
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Nowy kontakt został pomyślnie dodany.");
  } catch (error) {
    console.error("Błąd podczas dodawania nowego kontaktu:", error.message);
    throw error;
  }
}

listContacts();

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
