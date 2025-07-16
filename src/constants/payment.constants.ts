/**
 * Payment methods allowed in sales transactions.
 *
 * @description
 * -> Enum representing the payment methods available for processing sales.
 * -> Includes options such as cash, credit, debit, Mercado Pago and Cuenta DNI.
 */
export enum PaymentType {
  CASH = 'cash',
  CREDIT = 'credit',
  DEBIT = 'debit',
  MP = 'mercado_pago',
  DNI = 'cuenta_dni'
}
