const fs = require('fs');
const files = ['RealTimeNotifications.jsx', 'PaymentsPage.jsx', 'Navigation.jsx', 'LiveStats.jsx', 'CreateDonationModal.jsx'];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/"\.\.\//g, '"./').replace(/'\.\.\//g, "'./");
  fs.writeFileSync(f, content, 'utf8');
});
console.log('Fixed imports in root src components.');
