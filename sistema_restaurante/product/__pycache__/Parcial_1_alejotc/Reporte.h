#ifndef REPORTE_H
#define REPORTE_H
#include <string>
#include <iostream>
#include "evento.h"
#include "Ordenar.h"
class Reporte {
public:
	Reporte(std::string filename);
	void generar_reporte();
	
private:
	std::string filename;
	void reporte_terremotos(std::vector<Evento> &e);
	void reporte_terremotos_colombia(std::vector<Evento> &e);
	
};

#endif

