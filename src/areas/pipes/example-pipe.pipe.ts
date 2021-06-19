import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ExamplePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);
    return value;
  }
}
