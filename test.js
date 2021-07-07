const mineflayer = require('mineflayer')
const { Item } = require('prismarine-item')
const { Vec3 } = require('vec3')

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bot', // minecraft username
//   password: '12345678' // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
})
bot.on("spawn", async () => {
  await bot.waitForChunksToLoad()
  bot.creative.startFlying()
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    bot.equip(bot.inventory.items()[0], "hand", async () => {
      console.log(bot.blockAt(bot.entity.position.offset(0, -1, 2)))
      await bot.lookAt(bot.entity.position.offset(0, -1, 2).add( new Vec3(0, 1, 0)))
      bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), new Vec3(0, 1, 0)).catch(async (fail) => {
        await bot.lookAt(bot.nearestEntity().position)
        bot.attack(bot.nearestEntity())
      })
    })
  })
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)
