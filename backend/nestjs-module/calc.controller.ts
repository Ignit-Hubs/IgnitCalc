import { Controller, Get, Post, Body, Delete, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CalcService, CreateCalculationDto, AuthDto } from './calc.service';

/**
 * ============================================================================
 * NESTJS CONTROLLER: CALCULATION & AUTHENTICATION ENDPOINTS
 * ============================================================================
 * Provides clean dependency injection, HTTP status codes, and type-safe routing.
 */

@Controller('api')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok', service: 'IgniteCalc NestJS Engine', timestamp: new Date().toISOString() };
  }

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() authDto: AuthDto) {
    return this.calcService.registerUser(authDto);
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    return this.calcService.loginUser(authDto);
  }

  @Post('verify-turnstile')
  @HttpCode(HttpStatus.OK)
  async verifyTurnstile(@Body('token') token: string) {
    const isHuman = await this.calcService.verifyCloudflare(token);
    return { success: isHuman, verifiedAt: new Date().toISOString() };
  }

  @Get('calculations')
  async getCalculations() {
    return this.calcService.getAllCalculations();
  }

  @Post('calculations')
  @HttpCode(HttpStatus.CREATED)
  async createCalculation(@Body() dto: CreateCalculationDto) {
    return this.calcService.saveCalculation(dto);
  }

  @Delete('calculations')
  async clearAll() {
    return this.calcService.clearAllCalculations();
  }
}

// 
