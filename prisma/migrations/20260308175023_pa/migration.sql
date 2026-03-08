-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "appGoal" TEXT,
ADD COLUMN     "area" TEXT,
ADD COLUMN     "notificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalWeightSaved" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "trash_transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "aiCategory" TEXT NOT NULL,
    "aiAccuracy" DOUBLE PRECISION NOT NULL,
    "deliveryType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "finalWeight" DOUBLE PRECISION,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trash_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_redemption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardTitle" TEXT NOT NULL,
    "pointsCost" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUCCESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_redemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trash_transaction_userId_idx" ON "trash_transaction"("userId");

-- CreateIndex
CREATE INDEX "reward_redemption_userId_idx" ON "reward_redemption"("userId");

-- AddForeignKey
ALTER TABLE "trash_transaction" ADD CONSTRAINT "trash_transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward_redemption" ADD CONSTRAINT "reward_redemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
