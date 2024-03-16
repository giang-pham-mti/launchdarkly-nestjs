import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaunchDarklyService } from './launchdarkly.service';
import * as LaunchDarkly from 'launchdarkly-node-server-sdk';
import { LaunchDarklyConfig } from 'launchdarkly.config';
import { RedisFeatureStore } from 'launchdarkly-node-server-sdk-redis';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: LaunchDarklyService,
      useFactory: async () => {
        const store = RedisFeatureStore({
          redisOpts: { host: 'localhost', port: 6379 },
          prefix: 'vsm',
          cacheTTL: 0,
        });
        const options: LaunchDarkly.LDOptions = {
          featureStore: store,
        };
        const ldClient = LaunchDarkly.init(LaunchDarklyConfig.sdkKey, options);
        await ldClient.waitForInitialization();
        return new LaunchDarklyService(ldClient);
      },
    },
  ],
})
export class AppModule {}
