import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tabcomponent'
})
export class TabcomponentPipe implements PipeTransform {

  transform(value: any, args: string[]): any {

    const tabcomponent = [];

    // Récupération des informations relatives aux dates

    // 0 : Date de la demande
    tabcomponent.push(value.date.getDate() + '/' + (value.date.getMonth() + 1) + '/' + value.date.getFullYear());

    // 1 : Type de la demande
    tabcomponent.push(value.linked_event.title.split('- ')[1].split(' du')[0]);

    // 2 : Date de début de la demande
    tabcomponent.push(value.linked_event.title.split(' du ')[1].split(' (')[0]);

     // 3 : Matin ou après midi début
    tabcomponent.push(value.linked_event.title.split(' (')[1].split(')')[0]);

    // 4 : Date de fin de la demande
    tabcomponent.push(value.linked_event.title.split(' au ')[1].split(' (')[0]);

    // 5 : Matin ou après midi fin
    // tabcomponent.push(value.linked_event.)
    tabcomponent.push(value.linked_event.title.split(' (')[2].split(')')[0]);

    // 6 : Statut de la demande
    tabcomponent.push(value.linked_event.title.split('[')[1].split(']')[0]);

    return tabcomponent;
  }

}
