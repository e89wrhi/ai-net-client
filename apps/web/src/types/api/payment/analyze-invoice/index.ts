export interface AnalyzeInvoiceWithAIRequestDto {
  InvoiceId: string;
}
export interface AnalyzeInvoiceWithAIResponseDto {
  Summary: string;
  Analysis: string;
  HasAnomalies: boolean;
}
