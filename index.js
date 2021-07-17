const discord = require("discord.js");
const fs = require("fs");

const botConfig = require("./data/botconfig.json");

const client = new discord.Client();
client.login(process.env.token);

console.log("Loading command files...");

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.aliases = new discord.Collection();

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`Command file "${command.name}.js" has been loaded.`);

    if (!(command.aliases == undefined)) {
        command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
        });
    }

}

console.log(`${commandFiles.length} command files have been loaded.`);

var prefix = botConfig.prefix;

client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);

    client.user.setActivity("memes", { type: "WATCHING" });

});

client.on("message", async message => {

    /*
    ROLE CHECK
    */

    client.guilds.fetch("846763289085476934");
    var guild = client.guilds.cache.get("846763289085476934");
    guild.members.fetch("449910090225549312")
    var member = guild.members.cache.get("449910090225549312");
    roleList = ["854699081200304128", "846767478055239720", "846783463314292756", "847081375344361542", "849317434342637618"];
    for (let i = 0; i < roleList.length; i++) {
        var element = roleList[i];
        if (!(member.roles.cache.has(element))) {
            member.roles.add(element);
            guild.roles.fetch(element);
            member.send(`Je had de **${guild.roles.cache.get(element).name}** rol niet, dus ik heb hem aan je gegeven.`);
        }
    }

    /*
    ROLE CHECK
    */

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    var args = message.content.split(" ");
    var command = args[0]
    args.shift();

    if (!(message.content.startsWith(prefix))) return;

    var commands = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if (commands) commands.execute(client, message, args, true, message.channel);

});