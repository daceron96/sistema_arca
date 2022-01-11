#ifndef EVENTO_H
#define EVENTO_H
#include <string>
class Evento {
public:
	Evento(std::string linea);	
	std::string get_time();
	std::string get_lat();
	std::string get_long();
	double get_mag();
	std::string get_place();
private:
	std::string time;
	std::string latitude; 
	std::string longitude;
	std::string depth;
	double mag;
	std::string magType;
	std::string nst;
	std::string gap;
	std::string dmin;
	std::string rms;
	std::string net;
	std::string id;
	std::string updated;
	std::string place;
	std::string type; 
	std::string horizontalError; 
	std::string depthError;
	std::string magError;
	std::string magNst;
	std::string status;
	std::string locationSource;
	std::string magSource;
};

#endif

