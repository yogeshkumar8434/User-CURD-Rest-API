import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { UserStatus } from '../user-status.enum';

export class GetUserFilterDto {
  @IsOptional()
  @IsIn([UserStatus.ACTIVE, UserStatus.IN_ACTIVE])
  status: UserStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
