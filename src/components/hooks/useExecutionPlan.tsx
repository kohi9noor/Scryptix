import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidtionError,
} from "@/lib/workflow/FlowToExecutionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidtion";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidtionError.NO_ENTRY_POINT:
          toast.error("No entry point");
          break;
        case FlowToExecutionPlanValidtionError.INVALID_INPUTS:
          toast.error("Not all inputs values are set");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error("something went wrong!");
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan, errors } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (errors) {
      console.log(errors);
      setInvalidInputs(errors.invalidElements || []);
      handleError(errors);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, setInvalidInputs, clearErrors, handleError]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
