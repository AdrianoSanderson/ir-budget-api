import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
    @Get('health')
    checkHealth() {
        const now = new Date();

        console.log(`Ativo em ${now.toLocaleString('pt-BR')}`);

        return {
            status: 'ok',
            timestamp: now,
        };
    }
}
