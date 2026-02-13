export interface GenerateInvoiceRequest {
  SubscriptionId: string;
  Amount: number;
  Currency: string;
  LineItems: string;
}
export interface GenerateInvoiceRequestResponse {
  Id: string;
}
