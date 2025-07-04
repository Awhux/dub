"use client";

import { useWorkspaceStore } from "@/lib/swr/use-workspace-store";
import { ProgramData } from "@/lib/types";
import { FormProvider, useForm } from "react-hook-form";

export function FormWrapper({ children }: { children: React.ReactNode }) {
  const [programOnboarding] =
    useWorkspaceStore<ProgramData>("programOnboarding");

  const methods = useForm<ProgramData>({
    defaultValues: {
      linkType: "short",
      programType: "new",
      defaultRewardType: "sale",
      type: "percentage",
      amount: null,
      maxDuration: 12,
      partners: [{ email: "", key: "" }],
    },
    values: programOnboarding
      ? {
          ...programOnboarding,
          defaultRewardType: programOnboarding.defaultRewardType ?? "sale",
          linkType: programOnboarding.linkType ?? "short",
          programType: programOnboarding.programType ?? "new",
          type: programOnboarding.type ?? "percentage",
          amount: programOnboarding.amount ?? null,
          partners: programOnboarding.partners?.length
            ? programOnboarding.partners
            : [{ email: "", key: "" }],
        }
      : undefined,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
