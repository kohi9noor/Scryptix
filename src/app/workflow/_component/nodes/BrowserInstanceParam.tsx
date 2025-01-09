import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";

const BrowserInstanceParam = ({
  value,
  updateNodeParamValue,
  param,
}: ParamProps) => {
  return <p className=" text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
