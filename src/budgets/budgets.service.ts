import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly repository: Repository<Budget>,
    private readonly emailService: EmailService,
  ){}

  calculatePrice(data: CreateBudgetDto): number {
    let price = 100;

    // Dependentes
    if (data.hasDependents && data.dependents) {
      price += data.dependents * 30;
    }

    // Investimentos
    if (data.hasFixedIncome) price += 20;
    if (data.hasVariableIncome) price += 100;

    // Aluguel
    if (data.hasRentIncome) price += 70;

    // Carnê-leão
    if (data.hasRentIncome && data.didCarnetLeao === false) {
      price += 80;
    }

    // Autônomo
    if (data.isSelfEmployed) price += 120;

    // Ganho de capital
    if (data.hasCapitalGains) price += 120;

    return price;
  }

  async create(data: CreateBudgetDto) {
    const price = this.calculatePrice(data);

    const budget = this.repository.create({
      ...data,
      total: price,
    });

    await this.repository.save(budget);

    await this.emailService.sendBudgetEmail(budget);

    return {
      message: 'Orçamento calculado com sucesso',
      price,
      id:budget.id,
    };
  }
}