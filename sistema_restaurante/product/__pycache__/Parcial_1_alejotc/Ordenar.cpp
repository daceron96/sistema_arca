#include "Ordenar.h"

void Ordenar::quicksort(std::vector<Evento> &e){
	ordenar_quicksort(e, 0, e.size()-1);
}

void Ordenar::ordenar_quicksort(std::vector<Evento> &e, int pos_inicial, int pos_final){
	int p = 0;
	
	if(pos_final > pos_inicial){
		p = particionar_quisort(e, pos_inicial, pos_final);
		
		ordenar_quicksort(e, pos_inicial, p-1);
		ordenar_quicksort(e, p+1, pos_final);
	}
}

int Ordenar::particionar_quisort(std::vector<Evento> &e, int pos_inicial, int pos_final){
	double pivote = e[pos_inicial].get_mag();
	int i = pos_inicial;
	int j = pos_final;
	Evento tmp = e[pos_inicial];
	
	while( i < pos_final && e[i].get_mag() >= pivote){
		i++;
	}
	
	while(e[j].get_mag() < pivote ){
		j--; 
	}
	
	while( i < j){
		tmp = e[i];
		e[i] = e[j];
		e[j] = tmp;
		i++;
		j--;
		
		while( e[i].get_mag() >= pivote){
			i++;
		}
		
		while( e[j].get_mag() < pivote){
			j--; 
		}
		
	}	
	
	tmp = e[pos_inicial];
	e[pos_inicial] = e[j];
	e[j] = tmp;
	
	return j;
	
	
}
