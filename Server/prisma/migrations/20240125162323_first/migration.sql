-- CreateTable
CREATE TABLE "Technologies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creator" TEXT NOT NULL,
    "launch_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Technologies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Technologies_creator_key" ON "Technologies"("creator");

-- CreateIndex
CREATE UNIQUE INDEX "Technologies_objective_key" ON "Technologies"("objective");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
