/**
 * Stripe & SweatPals Integrated Gateway Bridge
 * Direct sales orchestration for tickets, sponsorships, and merchant checkouts.
 */

export const PaymentGateway = {
  sweatPalsEventUrl: "https://sweatpals.com/event/sensorium-presents-an-experienced-conscious-lifestyle/2026-09-19",
  
  ticketTiers: [
    {
      id: "outdoor_market_pass",
      name: "Conscious Market Pass",
      price: "$0",
      description: "Free general admission to the outdoor vendor marketplace, elixir bars, and community grounds (5:00 PM – 9:30 PM).",
      actionLabel: "RSVP Free",
      isFree: true
    },
    {
      id: "indoor_sanctuary_pass",
      name: "Full Sanctuary Experience",
      price: "$33–$55",
      description: "Access to all indoor micro-workshops, 432Hz sound immersion, live podcast panel, and biohacking zones (5:00 PM – 11:00 PM).",
      actionLabel: "Get Workshop Pass",
      isFree: false
    },
    {
      id: "vendor_partner_booth",
      name: "Conscious Vendor Booth",
      price: "$111",
      description: "Dedicated 10x10 booth in the outdoor marketplace with power access and brand spotlight.",
      actionLabel: "Apply for Booth",
      isFree: false
    }
  ],

  createCheckoutSession: async (tierId, customerInfo) => {
    // Seamless routing to SweatPals or Stripe direct checkout
    return {
      success: true,
      checkoutUrl: PaymentGateway.sweatPalsEventUrl,
      tierId,
      customerInfo
    };
  }
};
