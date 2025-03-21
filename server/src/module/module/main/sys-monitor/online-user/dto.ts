import { PageDto } from '../../../../../common/dto/PageDto';
import { ApiProperty } from '@nestjs/swagger';

export class OnlineUserSelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userid: string;

  @ApiProperty({ description: '用户名', required: false })
  username: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}
