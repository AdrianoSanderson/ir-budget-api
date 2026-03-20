import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Matches,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\d{10,11}$/)
  phone: string;

  // Dependentes
  @IsBoolean()
  hasDependents: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  dependents?: number;

  // Investimentos
  @IsBoolean()
  hasFixedIncome: boolean;

  @IsBoolean()
  hasVariableIncome: boolean;

  @IsOptional()
  @IsString()
  investmentDetails?: string;

  // Rendimentos principais
  @IsBoolean()
  hasMainIncome: boolean;

  @IsOptional()
  @IsString()
  mainIncomeDescription?: string;

  // Aluguel
  @IsBoolean()
  hasRentIncome: boolean;

  @IsOptional()
  @IsString()
  rentDetails?: string;

  @IsOptional()
  @IsBoolean()
  didCarnetLeao?: boolean;

  // Outros rendimentos
  @IsBoolean()
  hasOtherIncome: boolean;

  @IsOptional()
  @IsString()
  otherIncomeDescription?: string;

  // Autônomo
  @IsBoolean()
  isSelfEmployed: boolean;

  @IsOptional()
  @IsBoolean()
  exceededAutonomousLimit?: boolean;

  // Bens
  @IsBoolean()
  hasAssets: boolean;

  @IsOptional()
  @IsString()
  assetsDescription?: string;

  // Dívidas
  @IsBoolean()
  hasDebts: boolean;

  // Despesas
  @IsBoolean()
  hasDeductibleExpenses: boolean;

  @IsOptional()
  @IsString()
  deductibleExpensesDescription?: string;

  // Ganho de capital
  @IsBoolean()
  hasCapitalGains: boolean;

  @IsOptional()
  @IsBoolean()
  didFillGcap?: boolean;

  // Observações
  @IsOptional()
  @IsString()
  notes?: string;
}