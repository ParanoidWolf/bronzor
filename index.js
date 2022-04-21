const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const token = process.env['token'] 
// Add your token in the enviorment variables tab
const prefix = "." 
// You can change this to whatever you want

// Status message
client.once('ready', async () => {
    console.log('Bronzor is online!');
    client.user.setActivity("a house keeper", {
        type: "PLAYING" 
      // Change this to PLAYING, WATCHING, or LISTENING Change the text next to set activity to whatever you want
    });
});

// Command handler
client.on('messageCreate', message =>{
  function reply(text){
    message.channel.send(text)
  }
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase(); 
  // All command checks should be in lowercase
  const channel = message.channel
  const guild = message.guild
  if(!message.content.startsWith(prefix)) return;
  switch(command) {
    case "ping":
      reply("pong!")
      break;
    case "hello":
      message.reply("Hey!")
      break;
    case "wipe":
      message.channel.messages.fetch({
        limit: 100 // Change `100` to however many messages you want to fetch
      })
      .then((messages) => {
        message.channel.bulkDelete(messages).then(() => {
          message.channel.send("Cleared bot messages").then(msg => msg.delete({
            timeout: 3000
          }))
        });
      })
      break;
  }
})

client.login(token);
