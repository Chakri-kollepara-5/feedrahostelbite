const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const adminUID = "cSex4DXYe5Xbhf28bPClPJIHEF12";

admin
  .auth()
  .setCustomUserClaims(adminUID, { admin: true })
  .then(() => {
    console.log("🔥 SUCCESS: Admin role added to:", adminUID);
  })
  .catch((error) => {
    console.error("❌ ERROR:", error);
  });
