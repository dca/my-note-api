import { User } from '../../user/model/user.entity';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
  if (req.user) { return req.user as User; }
  return null;
});
