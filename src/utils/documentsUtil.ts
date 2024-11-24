export class DocumentsUtils {
  isValidCPF(cpf: string): boolean {
    if (!this.isString(cpf)) return false;

    const cleanedCpf = this.cleanCpf(cpf);
    if (
      !this.hasValidLength(cleanedCpf) ||
      this.hasAllDigitsEqual(cleanedCpf)
    ) {
      return false;
    }

    return this.hasValidCheckDigits(cleanedCpf);
  }

  private isString(value: any): value is string {
    return typeof value === "string";
  }

  private cleanCpf(cpf: string): string {
    return cpf.replace(/[\s.-]*/g, "");
  }

  private hasValidLength(cpf: string): boolean {
    return cpf.length === 11;
  }

  private hasAllDigitsEqual(cpf: string): boolean {
    return /^(.)\1{10}$/.test(cpf);
  }

  private hasValidCheckDigits(cpf: string): boolean {
    return this.checkDigit(cpf, 9) && this.checkDigit(cpf, 10);
  }

  private checkDigit(cpf: string, digitPosition: number): boolean {
    const sum = this.calculateSum(cpf, digitPosition);
    const remainder = (sum * 10) % 11;
    const checkDigit = remainder === 10 || remainder === 11 ? 0 : remainder;
    return checkDigit === parseInt(cpf.charAt(digitPosition));
  }

  private calculateSum(cpf: string, digitPosition: number): number {
    let sum = 0;
    const multiplierStart = digitPosition === 9 ? 11 : 12;

    for (let i = 1; i <= digitPosition; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (multiplierStart - i);
    }

    return sum;
  }
}
