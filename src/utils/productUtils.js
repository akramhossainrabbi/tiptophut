/**
 * Calculates discount and stock status for a single vendor grocery store
 * Type 0: Percentage (%)
 * Type 1: Fixed Amount (৳)
 */
export const getProductStatus = (product) => {
  const { 
    base_price, 
    discount, 
    discount_type, 
    has_deal, 
    flash_deal, 
    stock_manage, 
    stock_count, 
    total_sale 
  } = product;

  // 1. Determine active discount (Flash deal takes priority)
  let activeDiscount = discount || 0;
  let activeType = discount_type; // 0 or 1

  if (has_deal && flash_deal) {
    activeDiscount = flash_deal.discount;
    activeType = flash_deal.discount_type;
  }

  const price = parseFloat(base_price);
  let finalPrice = price;
  let label = "";

  if (activeType === 0) { // Percentage
    finalPrice = price - (price * activeDiscount) / 100;
    label = `-${activeDiscount}%`;
  } else { // Fixed Amount
    finalPrice = price - activeDiscount;
    label = `-৳${activeDiscount}`;
  }

  // 2. Stock Management Logic
  // if stock_manage is 1, check if (stock - sell) > 0
  const remainingStock = stock_count - total_sale;
  const isOutOfStock = stock_manage === 1 && remainingStock <= 0;

  return {
    originalPrice: price.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
    discountLabel: label,
    hasDiscount: activeDiscount > 0,
    isOutOfStock
  };
};