import { LegalSection } from "@/shared/components/sections/LegalPageLayout";


export const shippingPolicySections: LegalSection[] = [
  {
    id: "order-processing",
    title: "Order Processing",
    content: [
      {
        type: "paragraph",
        text: "Orders are processed once payment and, where applicable, sample or artwork approval have been confirmed. Processing times vary by product and order volume.",
      },
    ],
  },
  {
    id: "shipping-methods",
    title: "Shipping Methods",
    content: [
      {
        type: "list",
        items: ["Standard freight", "Express courier", "Bulk / palletized shipping for wholesale orders"],
      },
    ],
  },
  {
    id: "estimated-delivery-time",
    title: "Estimated Delivery Time",
    content: [
      {
        type: "paragraph",
        text: "Delivery times depend on the destination, shipping method and order type, and are communicated at the time of order confirmation.",
      },
    ],
  },
  {
    id: "shipping-charges",
    title: "Shipping Charges",
    content: [
      {
        type: "paragraph",
        text: "Shipping charges are calculated based on destination, weight and shipping method, and are shown before an order is confirmed.",
      },
    ],
  },
  {
    id: "order-tracking",
    title: "Order Tracking",
    content: [
      {
        type: "paragraph",
        text: "Tracking information is provided once an order has shipped, where the selected shipping method supports it.",
      },
    ],
  },
  {
    id: "customs-duties-and-taxes",
    title: "Customs, Duties, and Taxes",
    content: [
      {
        type: "paragraph",
        text: "International orders may be subject to customs duties, import taxes or other fees, which are the responsibility of the recipient.",
      },
    ],
  },
  {
    id: "incorrect-shipping-information",
    title: "Incorrect Shipping Information",
    content: [
      {
        type: "paragraph",
        text: "ROKAI is not responsible for delays or non-delivery caused by incorrect or incomplete shipping information provided at checkout.",
      },
    ],
  },
  {
    id: "lost-or-damaged-shipments",
    title: "Lost or Damaged Shipments",
    content: [
      {
        type: "paragraph",
        text: "If a shipment arrives damaged or is lost in transit, contact us promptly so we can assist with a claim through the relevant carrier.",
      },
    ],
  },
  {
    id: "delivery-delays",
    title: "Delivery Delays",
    content: [
      {
        type: "list",
        items: [
          "Weather and natural events",
          "Customs processing",
          "Carrier disruptions",
          "Incomplete shipping information",
        ],
      },
    ],
  },
];