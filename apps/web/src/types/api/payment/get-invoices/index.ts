export interface InvoiceDto {
  Id: string;
  SubscriptionId: string;
  Amount: number;
  Currency: string;
  Status: string;
  InvoiceNumber: string;
  IssuedAt: Date;
}
