module.exports = {
    name: 'hello',
    description: 'Hallo.',
    category: 'Information',
    execute(client, message, args) {

        return message.channel.send("Hallo.");

    },
};