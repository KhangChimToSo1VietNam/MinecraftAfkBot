import { createBot } from 'mineflayer';

const bot = createBot({
  host: 'vietmine.com',
  port: 25565,
  username: 'InfinityPremium',
  version: '1.16.5', // Minecraft version
});

// Function to click a slot in the chest
async function clickSlotWithRetry(bot, slot, window) {
  try {
    await bot.clickWindow(slot, 0, 0); // Left click
    console.log(`Clicked slot ${slot} successfully.`);
  } catch (err) {
    console.error(`Error clicking slot ${slot}:`, err);
    console.log('Retrying in 1 second...');
    setTimeout(() => clickSlotWithRetry(bot, slot, window), 1000);
  }
}

// Bot spawn logic
bot.once('spawn', () => {
  console.log('Bot has spawned.');

  // Perform login
  setTimeout(() => {
    bot.chat('/login SexSexSex');
    console.log('Logged in successfully.');
  }, 2000);

  // Select slot 1 and activate it to open the chest
  setTimeout(() => {
    bot.setQuickBarSlot(0); // Select the first slot (index 0)
    bot.activateItem(); // Right-click to open chest
    console.log('Clicked the first hotbar slot to open the chest.');
  }, 5000);
});

// Handle chest window after right-clicking
bot.once('windowOpen', (window) => {
  const lavaBucket = window.slots.find(item => item && item.name === 'lava_bucket');
  if (lavaBucket) {
    console.log('Lava bucket found! Attempting to withdraw...');
    clickSlotWithRetry(bot, lavaBucket.slot, window);

    // After teleporting to Skyblock, send /warp
    setTimeout(() => {
      bot.chat('/warp');
      console.log('Sent "/warp" command.');
    }, 2000);
  } else {
    console.log('No lava bucket found in the chest.');
  }

  // Close the chest window after interaction
  setTimeout(() => bot.closeWindow(window), 3000);
});

// Handle chest window after "/warp" command
bot.on('windowOpen', (window) => {
  const expBottle = window.slots.find(item => item && item.name === 'experience_bottle');
  if (expBottle) {
    console.log('Experience bottle found! Attempting to withdraw...');
    clickSlotWithRetry(bot, expBottle.slot, window);

    // Move forward after withdrawing
    setTimeout(() => {
      bot.setControlState('forward', true); // Start moving forward
      console.log('Moving forward for 5 seconds...');
      setTimeout(() => {
        bot.setControlState('forward', false); // Stop moving forward
        console.log('Stopped moving forward.');
      }, 3000);
    }, 2000);
  } else {
    console.log('No experience bottle found in this chest.');
  }

  // Close the chest window after interaction
  setTimeout(() => bot.closeWindow(window), 3000);
});

// Reconnection logic for robustness
bot.on('end', () => {
  console.log('Connection lost. Reconnecting...');
  setTimeout(() => bot.connect(), 5000);
});

bot.on('error', (err) => {
  console.error('Bot encountered an error:', err);
});
  