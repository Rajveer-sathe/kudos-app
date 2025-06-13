import Kudo from '../models/Kudo.js';
import User from '../models/User.js';

const usersData = [
  { name: 'Alice', email: 'alice@example.com', password: 'password', organization: 'Org1' },
  { name: 'Bob', email: 'bob@example.com', password: 'password', organization: 'Org1' },
  { name: 'Charlie', email: 'charlie@example.com', password: 'password', organization: 'Org1' },
];

export async function seedDemoData() {
  const count = await User.countDocuments();
  if (count > 0) return;

  const users = await User.insertMany(usersData);

  for (let i = 0; i < 5; i++) {
    const from = users[Math.floor(Math.random() * users.length)];
    const to = users[Math.floor(Math.random() * users.length)];
    if (from._id.toString() === to._id.toString()) continue;

    await Kudo.create({ from: from._id, to: to._id, message: `Great job on task #${i + 1}` });
  }
}
