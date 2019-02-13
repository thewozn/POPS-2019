import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tabcomponent'
})
export class TabcomponentPipe implements PipeTransform {

  transform(value: any, args: string[]): any {

    const tabcomponent = [];
    tabcomponent.push('2/1/2019');
    tabcomponent.push(value.title.split('- ')[1].split(' du')[0]);
    tabcomponent.push(value.title.split(' du ')[1].split(' (')[0]);
    tabcomponent.push(value.title.split(' (')[1].split(')')[0]);
    tabcomponent.push(value.title.split(' au ')[1].split(' (')[0]);
    tabcomponent.push(value.title.split(' (')[2].split(')')[0]);
    tabcomponent.push('Envoyé');
    tabcomponent.push(value.title.split('[')[1].split(']')[0]);

    return tabcomponent;
  }

}
