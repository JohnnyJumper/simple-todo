-- CreateTable
CREATE TABLE "ShoppingItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
