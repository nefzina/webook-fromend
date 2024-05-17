export class TokenData {
  constructor(
    public sub: string,
    public exp: number,
    public iat: number
  ) {}
}
