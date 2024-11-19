"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

import React, { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar Transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          {!userCanAddTransaction && (
            <TooltipContent>
              <p>
                Você atingiu o limite de transações mensais. Atualize o seu
                plano para adicionar mais transações.
              </p>
            </TooltipContent>
          )}
          <UpsertTransactionDialog
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
          />
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default AddTransactionButton;
