import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  id: string;

  @ApiProperty({ description: '用户名', required: false })
  username: string;

  @ApiProperty({ description: '密码', required: false })
  password: string;

  @ApiProperty({ description: '昵称', required: false })
  nickname: string;

  @ApiProperty({ description: '头像', required: false })
  avatar: string;

  @ApiProperty({ description: '性别', required: false })
  sex: string;

  @ApiProperty({ description: '邮箱', required: false })
  email: string;

  @ApiProperty({ description: '电话', required: false })
  tel: string;
}

export class UserSelListDto extends PageDto {
  @ApiProperty({ description: '用户名', required: false })
  username: string;

  @ApiProperty({ description: '昵称', required: false })
  nickname: string;

  @ApiProperty({ description: '性别', required: false })
  sex: string;

  @ApiProperty({ description: '查询是否带权限', required: false })
  ifWithRole: string;
}

export class LoginDto2 {
  @ApiProperty({ description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '密码私钥uuid', required: false })
  passwordKeyUuid: string;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  psdType: string;
}

export class LoginDto extends LoginDto2 {
  @ApiProperty({ description: '验证码', required: true })
  verificationCode: string;

  @ApiProperty({ description: '验证码uuid', required: true })
  verificationCodeUuid: string;
}

export class RegistDto extends LoginDto2 {
}

export class UpdPsdDto {
  @ApiProperty({ description: '旧密码', required: true })
  @IsNotEmpty({ message: '旧密码不能为空' })
  oldp: string;

  @ApiProperty({ description: '新密码', required: true })
  @IsNotEmpty({ message: '新密码不能为空' })
  newp1: string;

  @ApiProperty({ description: '确认新密码', required: true })
  @IsNotEmpty({ message: '确认新密码不能为空' })
  newp2: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  oldpType: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  newp1Type: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  newp2Type: string;
}

export class AdminNewUserDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  psdType: string;
}

export class ResetUserPsdDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  id: string;

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '密码类型，a:未加密/b:AES加密/c:RSA加密', required: true })
  @IsNotEmpty({ message: '密码类型不能为空' })
  psdType: string;
}
