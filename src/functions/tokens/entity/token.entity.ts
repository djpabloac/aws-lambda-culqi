export type Token = {
  id: number;
  card_number: number;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  created_at: Date;
  token: string;
  expiration_token: Date;
}

export type TokenResult = Omit<Token, 'id' | 'cvv' | 'created_at' | 'token' | 'expiration_token'>