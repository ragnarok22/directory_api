import { PipeTransform } from '@nestjs/common';

export class PhoneTransformPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}
