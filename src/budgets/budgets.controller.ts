import { Body, Controller, Post } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService){}

    @Post()
    create(@Body() createBudgetDTO: CreateBudgetDto){
        return this.budgetsService.create(createBudgetDTO);
    }
}
