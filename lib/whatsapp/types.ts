export interface SendParams {
  clinic:     string;
  clinicName: string;
  reviewUrl:  string;
  mobile:     string;
}

export type WhatsAppSender = (params: SendParams) => Promise<void>;
