import { faker } from "@faker-js/faker";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Product",
  "Design",
  "Support",
  "Legal",
];

const statuses = ["Active", "Inactive", "On Leave"];

export const generateUsers = (count = 10000) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 22, max: 65 }),
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      salary: faker.number.int({ min: 40000, max: 150000 }),
      joinedDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
      avatar: faker.image.avatar(),
    });
  }

  return users;
};
