#include "Evento.h"
#include <sstream>

Evento::Evento(std::string linea){
	std::string aux;
	std::istringstream iss(linea);
	std::getline(iss, time, ';');
	std::getline(iss,latitude, ';'); 
	std::getline(iss,longitude, ';');
	std::getline(iss,depth, ';');
	std::getline(iss,aux, ';');
	mag = strtod(aux.c_str(), NULL);
	std::getline(iss,magType, ';');
	std::getline(iss,nst, ';');
	std::getline(iss,gap, ';');
	std::getline(iss,dmin, ';');
	std::getline(iss,rms, ';');
	std::getline(iss,net, ';');
	std::getline(iss,id, ';');
	std::getline(iss,updated, ';');
	std::getline(iss,place, ';');
	std::getline(iss,type, ';'); 
	std::getline(iss,horizontalError, ';'); 
	std::getline(iss,depthError, ';');
	std::getline(iss,magError, ';');
	std::getline(iss,magNst, ';');
	std::getline(iss,status, ';');
	std::getline(iss,locationSource, ';');
	std::getline(iss,magSource, '\n');
	
}

//gets
std::string Evento::get_time(){
	return time;
}

double Evento::get_mag(){
	return mag;
}

std::string Evento::get_lat(){
	return latitude;
}
std::string Evento::get_long(){
	return longitude;
}
std::string Evento::get_place(){
	return place;
}
