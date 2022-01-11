#include "Reporte.h"

int main (int argc, char *argv[]) {
	
	if(argc != 2){
		std::cerr << "Debe espicificar el nombre del archivo csv" <<std::endl;
		exit(EXIT_FAILURE);
	}
	
	Reporte r(argv[1]);
	r.generar_reporte();
	
	
	exit(EXIT_SUCCESS);
	return 0;
}

