#include "Reporte.h"
#include <fstream>
#include <vector>
#include <iomanip>
#include <cstring>
Reporte::Reporte(std::string filename): filename (filename){
	
}

void Reporte::generar_reporte(){
	
	std::ifstream datos(filename);
	if (!datos.is_open()){
		std::cerr << "Error al abrir el archivo" << std::endl;
		return;
	}
	 
	std::string linea;
	std::vector<Evento> eventos;
	//std::cout << linea << std::endl;
	int bandera = 0;
	while( !datos.eof()){
		std::getline(datos, linea);
		if (bandera != 0){			
			Evento e(linea);
			eventos.push_back(e);
		}
		bandera++;
	}
		
	datos.close();		
	
	int opc;
	
	do{
		std::cout << "1. Generar reporte de los 10 terremotos con mayor magnitud. " << std::endl;
		std::cout << "2. Generar reporte de los terremotos ocurridos en colombia. " << std::endl;
		std::cout << "0. Salir " << std::endl;
		std::cout << "Ingrese la opcion deseada: ";
		std::cin >> opc;
		std::cout << "\n";
		switch(opc){
			case 1:
				reporte_terremotos(eventos);
				break;
			case 2:
				reporte_terremotos_colombia(eventos);
				break;
			default:
				std::cout << "Opcion incorrecta" << std::endl;
				break;
		}
		
	} while(opc != 0);
	
	
}

void Reporte::reporte_terremotos(std::vector<Evento> &e){
	Ordenar ordenar;
	ordenar.quicksort(e);
	std::cout << std::setw(15) << "Fecha"
		<< std::setw(19) << "Latitud"
		<< std::setw(12) << "Longitud"
		<< std::setw(7) << "Mag" 
		<< std::setw(20) << "Ubicacion"<< std::endl;
	for(unsigned int i = 0; i <10; i++){
		std::cout << std::setw(21) << e[i].get_time()
			<< std::setw(10) << e[i].get_lat()
			<< std::setw(12) << e[i].get_long()
			<< std::setw(7) << e[i].get_mag() 
			<< std::setw(50) << e[i].get_place() << std::endl;
	}
	
	std::cout << "\n";
	
}

void Reporte::reporte_terremotos_colombia(std::vector<Evento> &e){
	std::cout << std::setw(15) << "Fecha"
		<< std::setw(19) << "Latitud"
		<< std::setw(12) << "Longitud"
		<< std::setw(7) << "Mag" 
		<< std::setw(20) << "Ubicacion"<< std::endl;
	for(unsigned int i=0; i < e.size(); i++ ){
		if(strstr(e[i].get_place().c_str(), "Colombia") != NULL){
			std::cout << std::setw(21) << e[i].get_time()
				<< std::setw(10) << e[i].get_lat()
				<< std::setw(12) << e[i].get_long()
				<< std::setw(7) << e[i].get_mag() 
				<< std::setw(50) << e[i].get_place() << std::endl;
		}
	}
	
	std::cout << "\n";
	
}
