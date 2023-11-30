const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <email>', 'user email')
    .option('-p, --phone <phone>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contacts = require('./db/contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
        case 'get':
            const contact = await contacts.getContactById(id);
            return console.log(contact);
        case 'remove':
            const delContact = await contacts.removeContact(id);
            console.log(delContact);
        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            return console.log(newContact);
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(argv);