// Utwórz import modułu contacts.js w pliku index.js i sprawdź wydajność funkcji dla pracy z kontaktami.

const contacts = require("./contacts");

const { Command } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allImportedContacts = await contacts.listContacts();
      console.table(allImportedContacts);
      break;

    case "get":
      // ... id
      const oneContactsfromId = await contacts.getContactById(id);
      console.table(oneContactsfromId);
      break;

    case "add":
      // ... name email phone
      const createNewContacts = await contacts.addContact({
        name,
        email,
        phone,
      });
      console.table(createNewContacts);
      break;

    case "remove":
      // ... id
      const deleteContacts = await contacts.removeContact(id);
      console.table(deleteContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

invokeAction(program.opts());
