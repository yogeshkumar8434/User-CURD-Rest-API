import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserStatus } from '../user-status.enum';

export class UserStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [UserStatus.ACTIVE, UserStatus.IN_ACTIVE];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('Invalid Status');
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
