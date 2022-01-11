#ifndef ORDENAR_H
#define ORDENAR_H
#include <vector>
#include "Evento.h"
class Ordenar {
public:
	void quicksort(std::vector<Evento> &e);
private:
	int particionar_quisort(std::vector<Evento> &e, int pos_inicial, int pos_final);
	void ordenar_quicksort(std::vector<Evento> &e, int pos_inicial, int pos_final);
};

#endif

