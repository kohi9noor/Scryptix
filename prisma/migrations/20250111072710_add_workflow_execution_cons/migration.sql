-- AlterTable
ALTER TABLE "ExecutionPhase" ADD COLUMN     "outputs" TEXT;

-- RenameForeignKey
ALTER TABLE "ExecutionPhase" RENAME CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" TO "ExecutionPhase_execution_fkey";

-- AddForeignKey
ALTER TABLE "ExecutionPhase" ADD CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
