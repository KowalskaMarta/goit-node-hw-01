import { listContacts, getContactById, addContact, removeContact } from "./contacts.js";
import { Command } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allImportedContacts = await listContacts();
      console.table(allImportedContacts);
      break;

    case "get":
      const oneContactsfromId = await getContactById(id);
      console.table(oneContactsfromId);
      break;

    case "add":
      const createNewContacts = await addContact(name, email, phone);
      console.table(createNewContacts);
      break;

    case "remove":
      const deleteContacts = await removeContact(id);
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
