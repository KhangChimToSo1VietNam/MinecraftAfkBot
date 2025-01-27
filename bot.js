import { createBot } from 'mineflayer';

// Hàm tạo bot
const bot = createBot({
  host: 'vietmine.com',
  port: 25565,
  username: 'InfinityPremium',
  version: '1.16.5',          // Phiên bản Minecraft
});

// Function to handle spawn logic
bot.on('spawn', () => {
  console.log('Bot Test đã kết nối thành công!');

  // Thực hiện lệnh đăng nhập sau 5 giây
  setTimeout(() => {
    bot.chat('/login SexSexSex'); // Lệnh đăng nhập
    console.log('Đã thực hiện lệnh: /login MatKhau');

    // Sau 3 giây, click chuột trái vào ô đầu tiên
    setTimeout(() => {
      bot.setQuickBarSlot(0); // Chọn ô đầu tiên (slot 0)
      bot.activateItem();     // Click chuột trái
      console.log('Đã click chuột trái vào ô đầu tiên của hotbar.');
    }, 3000);
  }, 5000);
});

// Retry function for clicking a slot
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

// Handle opening a window
bot.on('windowOpen', (window) => {
  const lavaBucket = window.slots.find(item => item && item.name === 'lava_bucket');
  if (lavaBucket) {
    console.log('Lava bucket found! Attempting to withdraw...');
    clickSlotWithRetry(bot, lavaBucket.slot, window);
  } else {
    console.log('No lava bucket found.');
  }
  bot.closeWindow(window);
});

// Handle warp command
const welcome = () => {
  bot.chat('/warp');
};

bot.on('spawn', welcome);

// Handle experience bottles
bot.on('windowOpen', (window) => {
  const expBottle = window.slots.find(item => item && item.name === 'experience_bottle');
  if (expBottle) {
    console.log('Experience bottle found! Attempting to withdraw...');
    clickSlotWithRetry(bot, expBottle.slot, window);
  } else {
    console.log('No experience bottle found.');
  }
  bot.closeWindow(window);
});
