import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LaunchDarklyService } from './launchdarkly.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly launchDarklyService: LaunchDarklyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('context')
  async getFeatureFlagByContext(): Promise<string> {
    const user = { key: 'user-key-test4', country: 'cuba' };
    const flagValue = await this.launchDarklyService.getFeatureFlagValue(
      'test-flags',
      user,
    );
    return flagValue ? 'Enabled' : 'Disabled';
  }

  @Get('feature-flag')
  async getFeatureFlag(): Promise<string> {
    const user = { key: 'user-key', country: 'usa1' };
    const flagValue = await this.launchDarklyService.getFeatureFlagValue(
      'test-flags',
      user,
    );
    return flagValue ? 'Enabled' : 'Disabled';
  }
}
