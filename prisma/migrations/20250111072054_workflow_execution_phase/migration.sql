/*
  Warnings:

  - You are about to drop the column `updateAt` on the `WorkFlow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkFlow" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "WorkflowExecution" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "WorkflowExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionPhase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "inputs" TEXT,
    "workflowExecutionId" TEXT NOT NULL,

    CONSTRAINT "ExecutionPhase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkflowExecution_status_userId_idx" ON "WorkflowExecution"("status", "userId");

-- CreateIndex
CREATE INDEX "ExecutionPhase_workflowExecutionId_status_idx" ON "ExecutionPhase"("workflowExecutionId", "status");

-- AddForeignKey
ALTER TABLE "WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkFlow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionPhase" ADD CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkFlow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
