module.exports = {
    name: 'hallo',
    description: 'Hallo.',
    category: 'Informatie',
    execute(client, message, args) {

        return message.channel.send("Hallo.");

    },
};