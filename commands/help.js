module.exports = {
    name: 'help',
    description: 'Bekijk een lijst van alle commando\'s.',
    category: 'Informatie',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;

        var embedDescription = "\n\n[] = verplicht / {} = optioneel / () = meerdere mogelijke antwoorden";
        var helpMenu = args.join(" ");

        var informationEmbed = new discord.MessageEmbed()
            .setTitle("HELP (INFORMATIE)")
            .setDescription(`${embedDescription}`)
            .setColor("ORANGE")
            .setTimestamp()

        var gamesEmbed = new discord.MessageEmbed()
            .setTitle("HELP (GAMES)")
            .setDescription(`${embedDescription}`)
            .setColor("ORANGE")
            .setTimestamp()

        var commandList = [];

        client.commands.forEach(command => {

            var constructor = {

                name: command.name,
                description: command.description,
                category: command.category

            }

            commandList.push(constructor);

        });

        var informationAmount = 0;
        var gamesAmount = 0;

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Informatie") {

                informationAmount++;
                informationEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            } else if (command["category"] === "Games") {

                gamesAmount++;
                gamesEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            }

        }

        if (helpMenu === "informatie" || helpMenu === "info") {

            return message.channel.send(informationEmbed);

        } else if (helpMenu === "games") {

            return message.channel.send(gamesEmbed);

        } else {

            var helpMenuEmbed = new discord.MessageEmbed()
                .setTitle("HELP")
                .setDescription(`${embedDescription}\n\n**Gebruik !help [categorie] om alle commando's van die categorie te bekijken.**`)
                .setColor("ORANGE")
                .setTimestamp()
                .addFields(
                    { name: "\u200b", value: "\u200b" },
                    { name: ":information_source: __Informatie__", value: `*Alle commando's die\ninformatie geven.*\n**${informationAmount} Commando's**`, inline: true },
                    { name: ":bonerCoins: __Games__", value: `*Alle commando's waarmee\nje games kan spelen.*\n**${gamesAmount} Commando's**`, inline: true },
                    { name: "\u200b", value: "\u200b" }
                )

            return message.channel.send(helpMenuEmbed);

        }

    },
};