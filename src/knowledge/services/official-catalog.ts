import type { OviKnowledgeService } from "../shared";
import { uniqueIds } from "../shared";
import { services } from "./catalog";

export const officialServices: OviKnowledgeService[] = services.map((service) => ({
  id: service.id,
  nombre: service.nombre,
  descripcion: service.descripcion,
  problema_que_resuelve: service.problemasQueResuelve,
  sectores: service.sectores,
  productos_relacionados: uniqueIds(service.productosAsociados),
  equipos: uniqueIds(service.equiposNecesarios),
  protocolos: uniqueIds(service.protocolosAsociados),
  beneficios: service.beneficios,
  galeria: service.galeria,
  estado: service.status,
}));
