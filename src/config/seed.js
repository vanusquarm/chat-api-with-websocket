// seed.js
const mongoose = require('mongoose');

const chats = [
  {
    _id: "550e8400-e29b-41d4-a716-446655440001",
    name: "sylvan quarm",
    last_message: "Based on the structure of your chat data...",
    last_message_time: new Date("2025-09-12T14:00:00Z"),
    unread_count: 0,
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440002",
    name: "OCI Architect Associate Prep",
    last_message: "You’re an oracle cloud infrastructure architect coach...",
    last_message_time: new Date("2025-07-07T14:10:00Z"),
    unread_count: 3,
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Double-Leg Logging Report",
    last_message: "Here’s a professional project report...",
    last_message_time: new Date("2025-09-04T17:48:00Z"),
    unread_count: 0,
  },
];

const messages = [
  // Chat 1
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e160355e",
    chat_id: "550e8400-e29b-41d4-a716-446655440001",
    content:
      "Based on the structure of your chat data, we can design an SQL schema...",
    timestamp: new Date("2025-09-12T14:00:00Z"),
    sent: true,
  },
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e160355f",
    chat_id: "550e8400-e29b-41d4-a716-446655440001",
    content: "Here’s the SQL schema for chats and messages...",
    timestamp: new Date("2025-09-12T14:01:00Z"),
    sent: false,
  },

  // Chat 2
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e1603560",
    chat_id: "550e8400-e29b-41d4-a716-446655440002",
    content: "You’re an oracle cloud infrastructure architect coach...",
    timestamp: new Date("2025-07-07T14:08:00Z"),
    sent: false,
  },
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e1603561",
    chat_id: "550e8400-e29b-41d4-a716-446655440002",
    content: "C",
    timestamp: new Date("2025-07-07T14:09:00Z"),
    sent: true,
  },
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e1603562",
    chat_id: "550e8400-e29b-41d4-a716-446655440002",
    content:
      "That’s correct. Tip: memorize the regions and compartments...",
    timestamp: new Date("2025-07-07T14:10:00Z"),
    sent: false,
  },

  // Chat 3
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e1603563",
    chat_id: "550e8400-e29b-41d4-a716-446655440003",
    content:
      "Here’s a professional project report based on your document...",
    timestamp: new Date("2025-09-04T17:48:00Z"),
    sent: false,
  },
  {
    _id: "6fa459ea-ee8a-3ca4-894e-db77e1603564",
    chat_id: "550e8400-e29b-41d4-a716-446655440003",
    content: "Thanks, looks good.",
    timestamp: new Date("2025-09-04T17:49:00Z"),
    sent: true,
  },
];

async function seed(uri) {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    const chatsCol = db.collection("chats");
    const messagesCol = db.collection("messages");

    // Drop old data if exists
    await chatsCol.deleteMany({});
    await messagesCol.deleteMany({});

    // Insert seed data
    await chatsCol.insertMany(chats);
    await messagesCol.insertMany(messages);

    // Create useful indexes
    await messagesCol.createIndex({ chat_id: 1, timestamp: -1 });
    await chatsCol.createIndex({ last_message_time: -1 });

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = seed;

