export const formatCurrency = (amount: number) => {
  return Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
  }).format(Number(amount));
};
