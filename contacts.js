const fs = require("fs").promises;
const path = require("path");

// Ścieżka do pliku contacts.json
const contactsPath = path.join(__dirname, "db/contacts.json");

/**
 * Funkcja asynchroniczna, która zwraca listę kontaktów wczytaną z pliku contacts.json.
 *
 * @returns {Promise<Array>} - Zwraca listę kontaktów w postaci tablicy.
 */
async function listContacts() {
  try {
    // Wczytaj zawartość pliku contacts.json
    const fileContent = await fs.readFile(contactsPath, "utf-8");

    // Zwróć sparsowany obiekt JSON (lista kontaktów)
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Błąd podczas wczytywania listy kontaktów:", error.message);
    throw error;
  }
}

/**
 * Funkcja asynchroniczna, która zwraca kontakt o określonym identyfikatorze.
 *
 * @param {number} contactId - Identyfikator kontaktu.
 * @returns {Promise<Object|null>} - Zwraca obiekt kontaktu lub null, jeśli kontakt o danym identyfikatorze nie istnieje.
 */
async function getContactById(contactId) {
  try {
    // Wczytaj listę kontaktów
    const contacts = await listContacts();

    // Znajdź kontakt o określonym identyfikatorze
    const foundContact = contacts.find((contact) => contact.id === contactId);

    // Zwróć znaleziony kontakt lub null, jeśli kontakt nie istnieje
    return foundContact || null;
  } catch (error) {
    console.error(
      `Błąd podczas wyszukiwania kontaktu o ID ${contactId}:`,
      error.message
    );
    throw error;
  }
}

/**
 * Funkcja asynchroniczna, która usuwa kontakt o określonym identyfikatorze.
 *
 * @param {number} contactId - Identyfikator kontaktu.
 * @returns {Promise<void>} - Nie zwraca żadnej wartości.
 */
async function removeContact(contactId) {
  try {
    // Wczytaj listę kontaktów
    let contacts = await listContacts();

    // Usuń kontakt o określonym identyfikatorze
    contacts = contacts.filter((contact) => contact.id !== contactId);

    // Zapisz zaktualizowaną listę kontaktów do pliku
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log(`Kontakt o ID ${contactId} został pomyślnie usunięty.`);
  } catch (error) {
    console.error(
      `Błąd podczas usuwania kontaktu o ID ${contactId}:`,
      error.message
    );
    throw error;
  }
}

/**
 * Funkcja asynchroniczna, która dodaje nowy kontakt do listy.
 *
 * @param {string} name - Imię kontaktu.
 * @param {string} email - Adres e-mail kontaktu.
 * @param {string} phone - Numer telefonu kontaktu.
 * @returns {Promise<void>} - Nie zwraca żadnej wartości.
 */
async function addContact(name, email, phone) {
  try {
    // Wczytaj listę kontaktów
    let contacts = await listContacts();

    // Utwórz nowy kontakt
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };

    // Dodaj nowy kontakt do listy
    contacts.push(newContact);

    // Zapisz zaktualizowaną listę kontaktów do pliku
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Nowy kontakt został pomyślnie dodany.");
  } catch (error) {
    console.error("Błąd podczas dodawania nowego kontaktu:", error.message);
    throw error;
  }
}

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
