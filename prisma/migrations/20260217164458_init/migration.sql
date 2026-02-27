-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "comment" TEXT,
    "userAgent" TEXT,
    "ip" TEXT,
    "source" TEXT NOT NULL DEFAULT 'landing',
    "status" TEXT NOT NULL DEFAULT 'new'
);
