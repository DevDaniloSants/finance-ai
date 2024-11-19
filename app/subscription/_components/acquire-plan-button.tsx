"use client";

import { loadStripe } from "@stripe/stripe-js";

import { createStripeCheckout } from "../_actions/create-checkout";
import { Button } from "@/app/_components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();

  const handleAquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      throw new Error("Stripe publishable key not found");

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("Stripe not found");

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button variant="link" className="w-full" asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL}?prefilled_email=${encodeURIComponent(user.emailAddresses[0].emailAddress)}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button className="w-full rounded-full" onClick={handleAquirePlanClick}>
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
