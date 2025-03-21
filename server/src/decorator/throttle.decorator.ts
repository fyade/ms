import { applyDecorators, UseGuards } from '@nestjs/common';
import { ThrottleGuard } from '../guard/throttle.guard';

export function Throttle() {
  return applyDecorators(UseGuards(ThrottleGuard));
}
