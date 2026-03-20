import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // Dependentes
  @Column()
  hasDependents: boolean;

  @Column({ nullable: true })
  dependents?: number;

  // Investimentos
  @Column()
  hasFixedIncome: boolean;

  @Column()
  hasVariableIncome: boolean;

  @Column({ type: 'text', nullable: true })
  investmentDetails?: string;

  // Rendimentos principais
  @Column()
  hasMainIncome: boolean;

  @Column({ type: 'text', nullable: true })
  mainIncomeDescription?: string;

  // Aluguel
  @Column()
  hasRentIncome: boolean;

  @Column({ type: 'text', nullable: true })
  rentDetails?: string;

  @Column({ nullable: true })
  didCarnetLeao?: boolean;

  // Outros rendimentos
  @Column()
  hasOtherIncome: boolean;

  @Column({ type: 'text', nullable: true })
  otherIncomeDescription?: string;

  // Autônomo
  @Column()
  isSelfEmployed: boolean;

  @Column({ nullable: true })
  exceededAutonomousLimit?: boolean;

  // Bens
  @Column()
  hasAssets: boolean;

  @Column({ type: 'text', nullable: true })
  assetsDescription?: string;

  // Dívidas
  @Column()
  hasDebts: boolean;

  // Despesas dedutíveis
  @Column()
  hasDeductibleExpenses: boolean;

  @Column({ type: 'text', nullable: true })
  deductibleExpensesDescription?: string;

  // Ganho de capital
  @Column()
  hasCapitalGains: boolean;

  @Column({ nullable: true })
  didFillGcap?: boolean;

  // Observações
  @Column({ type: 'text', nullable: true })
  notes?: string;

  // Valor calculado
  @Column('decimal')
  total: number;

  // Data de criação
  @CreateDateColumn()
  createdAt: Date;
}