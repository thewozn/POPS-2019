import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tabcomponent'
})
export class TabcomponentPipe implements PipeTransform {

  transform(value: any, args: string[]): any {

    const tabcomponent = [];

    // Récupération des informations relatives aux dates
    const mm_s = value.date.getMonth() + 1;
    const dd_s = value.date.getDate();
    const yy_s = value.date.getFullYear();

    tabcomponent.push(dd_s + '/' + mm_s + '/' + yy_s);
    tabcomponent.push(value.linked_event.title.split('- ')[1].split(' du')[0]);
    tabcomponent.push(value.linked_event.title.split(' du ')[1].split(' (')[0]);
    tabcomponent.push(value.linked_event.title.split(' (')[1].split(')')[0]);
    tabcomponent.push(value.linked_event.title.split(' au ')[1].split(' (')[0]);
    tabcomponent.push(value.linked_event.title.split(' (')[2].split(')')[0]);
    tabcomponent.push('Envoyé');
    tabcomponent.push(value.linked_event.title.split('[')[1].split(']')[0]);

    return tabcomponent;
  }

}
