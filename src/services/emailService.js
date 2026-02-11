import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_yf76doq',
  templateId: 'template_vn9qy4b',
  publicKey: 'JyYK-zQkdAL7EXvrW'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

/* -------------------------------------------------
   SEND WELCOME EMAIL
-------------------------------------------------- */
export const sendWelcomeEmail = async (userData) => {
  try {
    if (!userData || typeof userData !== 'object') {
      console.error('❌ Invalid userData object provided');
      return false;
    }

    const email = userData.email?.trim();
    const name = userData.name?.trim();
    const userType = userData.userType?.trim();

    if (!email) {
      console.error('❌ Cannot send welcome email: empty email');
      console.error('Received userData:', userData);
      return false;
    }

    if (!name) {
      console.error('❌ Cannot send welcome email: empty name');
      console.error('Received userData:', userData);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email:', email);
      return false;
    }

    console.log('🚀 Sending welcome email to:', userData.email);

    const templateParams = {
      to_name: name,
      to_email: email,
      // Add variations to catch whatever variable the template uses for "To Email"
      email: email,
      recipient: email,
      reply_to: email,

      user_type: userType || 'volunteer',
      from_name: "Feedra Team",
      message: `Welcome to Feedra! We're thrilled to have you join our Food Saver Network. As a ${userType || 'volunteer'}, your contribution helps reduce food waste and support communities in India!`
    };

    console.log('📧 Template params:', templateParams);
    console.log('🔧 Using EmailJS Service:', EMAILJS_CONFIG.serviceId); // Debug Log

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Welcome email sent:', response.status, response.text);
    return response.status === 200;

  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return false;
  }
};

/* -------------------------------------------------
   SEND DONATION NOTIFICATION
-------------------------------------------------- */
export const sendDonationNotification = async (donationData) => {
  try {
    console.log('🚀 Sending donation notification to:', donationData.donorEmail);

    const templateParams = {
      to_name: donationData.donorName,
      to_email: donationData.donorEmail,
      from_name: "Feedra Team",
      donation_details: `${donationData.quantity}kg of ${donationData.foodType} at ${donationData.location}`,
      message: `Your donation has been posted! Thank you for helping reduce food waste. Your ${donationData.quantity}kg of ${donationData.foodType} will help families in need.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Donation email sent:', response.status, response.text);
    return response.status === 200;

  } catch (error) {
    console.error('❌ Failed to send donation notification:', error);
    return false;
  }
};

/* -------------------------------------------------
   SEND CLAIM NOTIFICATION
-------------------------------------------------- */
export const sendClaimNotification = async (claimData) => {
  try {
    console.log('🚀 Sending claim notification to:', claimData.donorEmail);

    const templateParams = {
      to_name: claimData.donorName,
      to_email: claimData.donorEmail,
      from_name: "Feedra Team",
      message: `Great news! ${claimData.claimerName} has claimed your donation of ${claimData.quantity}kg of ${claimData.foodType}. They will contact you soon. Thank you!`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Claim notification sent:', response.status, response.text);
    return response.status === 200;

  } catch (error) {
    console.error('❌ Claim notification error:', error);
    return false;
  }
};

/* -------------------------------------------------
   TEST EMAIL CONFIGURATION
-------------------------------------------------- */
export const testEmailConfiguration = async () => {
  try {
    console.log('🧪 Testing EmailJS configuration...');
    console.log('Service:', EMAILJS_CONFIG.serviceId);
    console.log('Template:', EMAILJS_CONFIG.templateId);
    console.log('Public Key:', EMAILJS_CONFIG.publicKey);

    const testParams = {
      to_name: 'Test User',
      to_email: 'test@feedra.com',
      from_name: 'Feedra Team',
      user_type: 'volunteer',
      message: 'Test email from Feedra. If you receive this, EmailJS is working!'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      testParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Test email sent:', response.status, response.text);
    return response.status === 200;

  } catch (error) {
    console.error('❌ Email config test failed:', error);
    return false;
  }
};

/* -------------------------------------------------
   VALIDATE EMAIL CONFIG
-------------------------------------------------- */
export const validateEmailConfig = () => {
  const isValid = !!(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  );

  console.log('📋 Email config validation:', {
    serviceId: !!EMAILJS_CONFIG.serviceId,
    templateId: !!EMAILJS_CONFIG.templateId,
    publicKey: !!EMAILJS_CONFIG.publicKey,
    isValid
  });

  return isValid;
};
