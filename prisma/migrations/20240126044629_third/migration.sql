/*
  Warnings:

  - You are about to drop the column `type` on the `Technologies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technologies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "launch_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objective" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Technologies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Technologies" ("categoryId", "creator", "id", "launch_date", "name", "objective", "price") SELECT "categoryId", "creator", "id", "launch_date", "name", "objective", "price" FROM "Technologies";
DROP TABLE "Technologies";
ALTER TABLE "new_Technologies" RENAME TO "Technologies";
CREATE UNIQUE INDEX "Technologies_name_key" ON "Technologies"("name");
CREATE UNIQUE INDEX "Technologies_creator_key" ON "Technologies"("creator");
CREATE UNIQUE INDEX "Technologies_objective_key" ON "Technologies"("objective");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
