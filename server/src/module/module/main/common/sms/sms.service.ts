import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
// import { serverConfig, tencentSmsConfig } from '@ms/config';
// import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { R } from '../../../../../common/R';
import { WinstonService } from '../../../../winston/winston.service';

@Injectable()
export class SmsService {
  // private env: ReturnType<typeof serverConfig.currentConfig>;
  // private smsClient = new tencentcloud.sms.v20210111.Client({
  //   credential: {
  //     secretId: tencentSmsConfig.secretId,
  //     secretKey: tencentSmsConfig.secretKey,
  //   },
  //   region: 'ap-nanjing',
  // });

  constructor(
    private readonly prisma: PrismaService,
    private readonly winston: WinstonService,
  ) {
    // this.env = serverConfig.currentConfig();
    // sms 示例代码
    // this.smsClient.SendSms(
    //   {
    //     SmsSdkAppId: tencentSmsConfig.SmsSdkAppId,
    //     SignName: tencentSmsConfig.SignName,
    //     TemplateId: tencentSmsConfig.template.yzm.id,
    //     TemplateParamSet: [],
    //     PhoneNumberSet: ['+86'],
    //   },
    //   (err, response) => {
    //     if (err) {
    //       this.winston.error(err);
    //       return;
    //     }
    //   },
    // );
  }
}
