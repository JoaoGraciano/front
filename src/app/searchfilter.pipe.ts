import { Pipe, PipeTransform } from '@angular/core';
import { PeriodicElement } from '../app/formulario/formulario.component';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(projects: PeriodicElement[], searchValue: string): any {

    if (!projects || !searchValue) {
      return projects;
    }
    return projects.filter(project =>
      project.nome.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
