import { AuthGuard } from '@nestjs/passport';

export class OptionalJwtAuthGuard extends AuthGuard('optional') {

  // Override handleRequest so it never throws an error
  handleRequest(err, user) {
    return user;
  }

}
