import { Injectable } from '@nestjs/common';
import { R } from '../../../../common/R';
import { AlgorithmDto } from './dto';
import { InterfaceService } from '../interface/interface.service';
import { InterfaceGroupService } from '../interface-group/interface-group.service';
import { AuthService } from '../../../auth/auth.service';
import { requestSF } from '../../../../api/request';
import { base } from '../../../../util/base';
import { BaseContextService } from '../../../base-context/base-context.service';
import { Exception } from "../../../../exception/exception";

@Injectable()
export class AlgorithmService {
  constructor(
    private readonly authService: AuthService,
    private readonly interfaceService: InterfaceService,
    private readonly interfaceGroupService: InterfaceGroupService,
    private readonly bcs: BaseContextService,
  ) {
  }

  async algorithm(dto: AlgorithmDto): Promise<R> {
    const permission = dto.perms;
    const sfPermissionsOfUserid = await this.authService.getSFPermissionsOfUserid(this.bcs.getUserData().userId, dto.pperms, permission, this.bcs.getUserData().loginRole, base.Y);
    if (sfPermissionsOfUserid.length > 0) {
      const permissionId = sfPermissionsOfUserid.every(item => item.ifUseUp === base.Y)
        ? sfPermissionsOfUserid[sfPermissionsOfUserid.length - 1].permissionId
        : sfPermissionsOfUserid[sfPermissionsOfUserid.findIndex(item => item.ifUseUp === base.N)].permissionId;
      const interfaceGroup = await this.interfaceGroupService.selOneInterfaceGroup(permissionId);
      const inter = await this.interfaceService.selAllInterface({ perms: dto.perms });
      if (interfaceGroup.data && inter.data.length > 0) {
        const response = await requestSF({
          baseURL: interfaceGroup.data.baseURL,
          url: inter.data[0].url,
          data: dto.data,
        });
        return R.ok(response);
      }
    }
    throw new Exception('');
  }
}
