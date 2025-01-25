const mineflayer = require('mineflayer');

// Hàm tạo bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'vietmine.com',      // Địa chỉ server
    port: 25565,               // Cổng server (mặc định là 25565)
    username: 'Test',          // Tên bot
    version: '1.8.8',          // Phiên bản Minecraft
  });

  // Khi bot kết nối thành công
  bot.on('spawn', () => {
    console.log('Bot Test đã kết nối thành công!');

    // Sau 5 giây, thực hiện lệnh đăng nhập
    setTimeout(() => {
      bot.chat('/login MatKhau'); // Lệnh đăng nhập
      console.log('Đã thực hiện lệnh: /login MatKhau');

      // Sau 3 giây, chuyển đến ô đầu tiên của hotbar và click chuột trái
      setTimeout(() => {
        bot.setQuickBarSlot(0); // Chọn ô đầu tiên (slot 0)
        bot.activateItem();     // Click chuột trái
        console.log('Đã click chuột trái vào ô đầu tiên của hotbar.');
      }, 3000); // Chờ 3 giây sau lệnh đăng nhập
    }, 5000); // Chờ 5 giây sau khi vào server
  });

  // Khi bot bị kick
  bot.on('kicked', (reason) => {
    console.log(`Bot bị kick: ${reason}`);
    console.log('Đang kết nối lại sau 2 giây...');
    setTimeout(() => {
      createBot(); // Tạo bot mới để kết nối lại
    }, 2000);
  });

  // Khi bot gặp lỗi
  bot.on('error', (err) => {
    console.log('Lỗi:', err);
    console.log('Đang thử kết nối lại sau 2 giây...');
    setTimeout(() => {
      createBot(); // Tạo bot mới để kết nối lại
    }, 2000);
  });

  // Khi kết nối bị đóng
  bot.on('end', () => {
    console.log('Kết nối bị đóng. Đang kết nối lại...');
    setTimeout(() => {
      createBot(); // Tạo bot mới để kết nối lại
    }, 2000);
  });
}

// Tạo bot ban đầu
createBot();
