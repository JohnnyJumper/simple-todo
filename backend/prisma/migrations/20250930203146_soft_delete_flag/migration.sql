-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_ShoppingItem" ("completed", "description", "id", "name", "quantity") SELECT "completed", "description", "id", "name", "quantity" FROM "ShoppingItem";
DROP TABLE "ShoppingItem";
ALTER TABLE "new_ShoppingItem" RENAME TO "ShoppingItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
