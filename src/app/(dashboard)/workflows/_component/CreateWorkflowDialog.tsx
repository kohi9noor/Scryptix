"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import CustomDialogHeader from "./CustomDialogHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWorkFlowSchema, createWorkflowType } from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkFlow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<createWorkflowType>({
    resolver: zodResolver(createWorkFlowSchema),
    defaultValues: {},
  });

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkFlow,
    onSuccess: (data) => {
      form.reset();
      setOpen(false);
      toast.success("Workflow created successfully!", {
        id: "create-workflow",
      });

      router.push(`workflow/editor/${data.id}`);
    },
    onError: () => {
      toast.error("failed to create workflow", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowType) => {
      toast.loading("creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className=" space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-muted-foreground ">Required</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      description
                      <p className="text-xs text-muted-foreground">Required</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className=" resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a breif description of what your workflow does.{" "}
                      <br /> This is optional but can help you remeber the
                      workflow&apos;s purpose.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className=" w-full" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
