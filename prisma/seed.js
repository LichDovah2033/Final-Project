import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ------------------------------------------------
  // USERS
  // ------------------------------------------------
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: adminPassword, role: "ADMIN" },
  });

  const user1 = await prisma.user.upsert({
    where: { username: "thorin" },
    update: {},
    create: { username: "thorin", password: userPassword, role: "USER" },
  });

  const user2 = await prisma.user.upsert({
    where: { username: "legolas" },
    update: {},
    create: { username: "legolas", password: userPassword, role: "USER" },
  });

  console.log("✓ Users seeded");

  // ------------------------------------------------
  // WEAPONS
  // ------------------------------------------------
  await prisma.weapon.createMany({
    skipDuplicates: true,
    data: [
      { name: "Longsword",        damageValue: 8,  price: 15.00 },
      { name: "Shortsword",       damageValue: 6,  price: 10.00 },
      { name: "Greataxe",         damageValue: 12, price: 30.00 },
      { name: "Dagger",           damageValue: 4,  price: 2.00  },
      { name: "Warhammer",        damageValue: 10, price: 15.00 },
      { name: "Handaxe",          damageValue: 6,  price: 5.00  },
      { name: "Rapier",           damageValue: 8,  price: 25.00 },
      { name: "Maul",             damageValue: 12, price: 10.00 },
      { name: "Flail",            damageValue: 8,  price: 10.00 },
      { name: "Quarterstaff",     damageValue: 6,  price: 2.00  },
    ],
  });

  console.log("✓ Weapons seeded");

  // ------------------------------------------------
  // ARMOR
  // ------------------------------------------------
  await prisma.armor.createMany({
    skipDuplicates: true,
    data: [
      { name: "Leather Armor",    protectionValue: 11, price: 10.00  },
      { name: "Chain Mail",       protectionValue: 16, price: 75.00  },
      { name: "Plate Armor",      protectionValue: 18, price: 1500.00 },
      { name: "Scale Mail",       protectionValue: 14, price: 50.00  },
      { name: "Studded Leather",  protectionValue: 12, price: 45.00  },
      { name: "Half Plate",       protectionValue: 15, price: 750.00 },
      { name: "Ring Mail",        protectionValue: 14, price: 30.00  },
      { name: "Splint Armor",     protectionValue: 17, price: 200.00 },
      { name: "Breastplate",      protectionValue: 14, price: 400.00 },
      { name: "Hide Armor",       protectionValue: 12, price: 10.00  },
    ],
  });

  console.log("✓ Armor seeded");

  // ------------------------------------------------
  // CARTS
  // ------------------------------------------------
  await prisma.cart.upsert({
    where: { userId: user1.id },
    update: {},
    create: { userId: user1.id },
  });

  await prisma.cart.upsert({
    where: { userId: user2.id },
    update: {},
    create: { userId: user2.id },
  });

  console.log("✓ Carts seeded");
  console.log("\nDone! Seed credentials:");
  console.log("  admin   / admin123  (ADMIN)");
  console.log("  thorin  / user123   (USER)");
  console.log("  legolas / user123   (USER)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
