import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valcomponent'
})
export class ValcomponentPipe implements PipeTransform {


  transform(value: any, args: string[]): any {

    const tabcomponent = [];

    tabcomponent.push(value.name + ' ' + value.surname);
    tabcomponent.push(value.service);
    tabcomponent.push(value.type);
    tabcomponent.push(value.linked_event.title.split(' du ')[1].split(' (')[0]);
    tabcomponent.push(value.linked_event.title.split(' (')[1].split(')')[0]);
    tabcomponent.push(value.linked_event.title.split(' au ')[1].split(' (')[0]);
    tabcomponent.push(value.linked_event.title.split(' (')[2].split(')')[0]);
    tabcomponent.push(value.linked_event.title.split('[')[1].split(']')[0]);

    /*
    tabcomponent.push(value.title.split('] ')[1].split(' -')[0]);
    tabcomponent.push('Finance');
    tabcomponent.push(value.title.split('- ')[1].split(' du')[0]);
    tabcomponent.push(value.title.split(' du ')[1].split(' (')[0]);
    tabcomponent.push(value.title.split(' (')[1].split(')')[0]);
    tabcomponent.push(value.title.split(' au ')[1].split(' (')[0]);
    tabcomponent.push(value.title.split(' (')[2].split(')')[0]);
    tabcomponent.push(value.title.split('[')[1].split(']')[0]);*/

    return tabcomponent;
  }

}
