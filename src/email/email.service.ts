import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Budget } from '../budgets/entities/budget.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor( private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });
  }

  async sendBudgetEmail(budget: Budget) {
    await this.transporter.sendMail({
      from: '"Sistema de Orçamentos" <consultoriaparadp@gmail.com>',
      to: 'consultoriaparadp@gmail.com, fernandaborgesf11@gmail.com',
      subject: 'Novo orçamento recebido 💰',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h2>📩 Novo orçamento recebido</h2>

            <h3>👤 Dados do cliente</h3>
            <p><strong>Nome:</strong> ${budget.name}</p>
            <p><strong>Email:</strong> ${budget.email}</p>
            <p><strong>Telefone:</strong> ${budget.phone}</p>

            <hr />

            <h3>📋 Respostas do formulário</h3>

            <p><strong>1. Serão informados dependentes na declaração?</strong> ${budget.hasDependents ? 'Sim' : 'Não'}</p>
            <p><strong>Número de dependentes:</strong> ${budget.dependents ?? '-'}</p>

            <p><strong>2. Possui investimentos em Renda Fixa?</strong> ${budget.hasFixedIncome ? 'Sim' : 'Não'}</p>

            <p><strong>3. Possui investimentos em renda variável (Bolsa de Valores)?</strong> ${budget.hasVariableIncome ? 'Sim' : 'Não'}</p>
            <p><strong>Informe os investimentos:</strong> ${budget.investmentDetails || '-'}</p>

            <p><strong>4. Teve rendimentos de salário, pró-labore, distribuição de lucros, aposentadoria ou pensão?</strong> ${budget.hasMainIncome ? 'Sim' : 'Não'}</p>
            <p><strong>Informe os rendimentos:</strong> ${budget.mainIncomeDescription || '-'}</p>

            <p><strong>5. Teve rendimentos de aluguéis de bens móveis ou imóveis?</strong> ${budget.hasRentIncome ? 'Sim' : 'Não'}</p>
            <p><strong>Informe os rendimentos:</strong> ${budget.rentDetails || '-'}</p>

            <p><strong>6. Caso tenha recebido aluguel de Pessoa Física acima do limite de isenção em algum mês, foi preenchido o carnê-leão?</strong> ${
            budget.didCarnetLeao === true
                ? 'Sim'
                : budget.didCarnetLeao === false
                ? 'Não'
                : 'Não se aplica'
            }</p>

            <p><strong>7. Teve outros rendimentos como: pensão alimentícia, doações ou heranças recebidas no ano de 2025?</strong> ${budget.hasOtherIncome ? 'Sim' : 'Não'}</p>
            <p><strong>Informe os rendimentos:</strong> ${budget.otherIncomeDescription || '-'}</p>

            <p><strong>8. Teve rendimentos como autônomo (Pessoa Física) no ano de 2025?</strong> ${budget.isSelfEmployed ? 'Sim' : 'Não'}</p>
            <p><strong>Em algum mês foi ultrapassado o limite de isenção?</strong> ${
            budget.exceededAutonomousLimit === true
                ? 'Sim'
                : budget.exceededAutonomousLimit === false
                ? 'Não'
                : '-'
            }</p>

            <p><strong>9. Possui bens e direitos a declarar, como valores em conta bancária, imóveis, veículos, etc.?</strong> ${budget.hasAssets ? 'Sim' : 'Não'}</p>
            <p><strong>Informe os bens e direitos:</strong> ${budget.assetsDescription || '-'}</p>

            <p><strong>10. Possui dívidas?</strong> ${budget.hasDebts ? 'Sim' : 'Não'}</p>

            <p><strong>11. Possui comprovantes de despesas médicas, com educação, ou de outras despesas dedutíveis?</strong> ${budget.hasDeductibleExpenses ? 'Sim' : 'Não'}</p>
            <p><strong>Informe despesas dedutíveis:</strong> ${budget.deductibleExpensesDescription || '-'}</p>

            <p><strong>12. Efetuou venda de bens móveis ou imóveis com ganho de capital em 2025?</strong> ${budget.hasCapitalGains ? 'Sim' : 'Não'}</p>
            <p><strong>Fez o preenchimento da GCAP e recolheu o IR devido?</strong> ${
            budget.didFillGcap === true
                ? 'Sim'
                : budget.didFillGcap === false
                ? 'Não'
                : '-'
            }</p>

            <p><strong>13. Outras informações:</strong> ${budget.notes || '-'}</p>

            <hr />

            <h3>💰 Resultado</h3>
            <p><strong>Valor do orçamento:</strong> R$ ${budget.total}</p>

            <hr />

            <p style="font-size: 12px; color: gray;">
            Enviado automaticamente pelo sistema
            </p>
        </div>
    `
    });
  }
}