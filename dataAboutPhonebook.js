const phonebook = require('./phonebook') // CommonJS modules

const numberOfEntries = () => phonebook.length;

const requestTime = () => {
    const time = new Date();
    return time;
};



module.exports = { numberOfEntries, requestTime };