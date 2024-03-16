import { Injectable } from '@nestjs/common';
import * as LaunchDarkly from 'launchdarkly-node-server-sdk';

@Injectable()
export class LaunchDarklyService {
  constructor(private readonly ldClient: LaunchDarkly.LDClient) {}

  async getFeatureFlagValue(
    flagKey: string,
    user: LaunchDarkly.LDUser,
  ): Promise<boolean> {
    return this.ldClient.variation(flagKey, user, true);
  }
}
