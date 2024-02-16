import {Injectable} from '@nestjs/common';

@Injectable()
export class CorreiosService {
  async trackObject(code: string) {
    return code;
  }
}
