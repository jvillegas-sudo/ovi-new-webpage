import { protocols } from "../protocols/catalog";
import { services } from "../services/catalog";
import { uniqueIds } from "../shared";
import type { OviKnowledgeProduct } from "../shared";
import { products } from "./catalog";

export const officialProducts: OviKnowledgeProduct[] = products.map((product) => {
  const derivedServices = services
    .filter((service) => service.productosAsociados.includes(product.id))
    .map((service) => service.id);

  const relatedProtocols = protocols
    .filter((protocol) => protocol.productosRequeridos.includes(product.id))
    .map((protocol) => protocol.id);

  return {
    id: product.id,
    nombre: product.nombre,
    categoria: product.categoria,
    descripcion: product.descripcion,
    beneficios: product.beneficios,
    aplicaciones: product.aplicaciones,
    sectores: product.industrias,
    tipo_de_suciedad: product.tiposSuciedad,
    superficies: product.superficiesCompatibles,
    modo_de_uso: product.modoUso,
    dilucion: product.dilucion,
    tiempo_de_accion: product.tiempoAccion ?? "Pendiente documentación oficial",
    equipos_recomendados: product.equipoRecomendado,
    servicios_relacionados: uniqueIds([...product.serviciosRelacionados, ...derivedServices]),
    protocolos_relacionados: uniqueIds(relatedProtocols),
    impacto_ambiental: product.impactoAmbiental,
    compatibilidades: uniqueIds([...product.superficiesCompatibles, ...product.equipoRecomendado]),
    incompatibilidades: [],
    ficha_tecnica: product.fichaTecnica ?? null,
    msds: product.msds ?? null,
    imagenes: product.imagenes,
    estado: product.status,
  };
});
