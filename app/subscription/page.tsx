import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

import AcquirePlanButton from "./_components/acquire-plan-button";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="flex flex-col items-center justify-center border-b border-solid py-10">
              <h2 className="text-2xl font-semibold">Plano Básico</h2>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold">R$</span>
                <span className="text-6xl font-bold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon size={20} className="text-primary" />
                <p>
                  Apenas 10 transações por dia
                  <span className="text-primary"> 7</span>/10
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon size={20} />
                <p>Relatórios de IA ilimitados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px]">
            <CardHeader className="flex flex-col items-center justify-center border-b border-solid py-10">
              <h2 className="text-2xl font-semibold">Plano Pro</h2>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold">R$</span>
                <span className="text-6xl font-bold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon size={20} className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon size={20} className="text-primary" />
                <p>Relatórios de IA ilimitados</p>
              </div>
            </CardContent>
            <CardFooter>
              <AcquirePlanButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
