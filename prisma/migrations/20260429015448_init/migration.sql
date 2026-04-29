/*
  Warnings:

  - The primary key for the `Armor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Armor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Weapon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Weapon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_CartArmors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CartWeapons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userId` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_CartArmors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CartArmors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_CartWeapons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CartWeapons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CartArmors" DROP CONSTRAINT "_CartArmors_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartArmors" DROP CONSTRAINT "_CartArmors_B_fkey";

-- DropForeignKey
ALTER TABLE "_CartWeapons" DROP CONSTRAINT "_CartWeapons_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartWeapons" DROP CONSTRAINT "_CartWeapons_B_fkey";

-- AlterTable
ALTER TABLE "Armor" DROP CONSTRAINT "Armor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Armor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CartArmors" DROP CONSTRAINT "_CartArmors_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_CartArmors_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_CartWeapons" DROP CONSTRAINT "_CartWeapons_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_CartWeapons_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "_CartArmors_B_index" ON "_CartArmors"("B");

-- CreateIndex
CREATE INDEX "_CartWeapons_B_index" ON "_CartWeapons"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartWeapons" ADD CONSTRAINT "_CartWeapons_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartWeapons" ADD CONSTRAINT "_CartWeapons_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartArmors" ADD CONSTRAINT "_CartArmors_A_fkey" FOREIGN KEY ("A") REFERENCES "Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartArmors" ADD CONSTRAINT "_CartArmors_B_fkey" FOREIGN KEY ("B") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
