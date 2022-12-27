import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trivia'
})
export class TriviaPipe implements PipeTransform {

  transform(text: string): string {
    return text.replace('&#039;', '') && text.replace('&quot;', '');
  }

}
