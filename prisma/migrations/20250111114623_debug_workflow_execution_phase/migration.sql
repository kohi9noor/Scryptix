-- DropForeignKey
ALTER TABLE "ExecutionPhase" DROP CONSTRAINT "ExecutionPhase_execution_fkey";

-- DropForeignKey
ALTER TABLE "ExecutionPhase" DROP CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey";

-- DropIndex
DROP INDEX "ExecutionPhase_workflowExecutionId_status_idx";

-- DropIndex
DROP INDEX "WorkflowExecution_status_userId_idx";

-- AddForeignKey
ALTER TABLE "ExecutionPhase" ADD CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
