import { products } from "../products/catalog";
import type { OviKnowledgeProtocol } from "../shared";
import { uniqueIds } from "../shared";
import { protocols } from "./catalog";

const productById = new Map(products.map((product) => [product.id, product]));

export const officialProtocols: OviKnowledgeProtocol[] = protocols.map((protocol) => {
  const protocolProducts = protocol.productosRequeridos
    .map((id) => productById.get(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const diluciones = uniqueIds(protocolProducts.map((product) => product.dilucion));
  const normasDeSeguridad = uniqueIds(
    protocolProducts.flatMap((product) => product.informacionSeguridad),
  );

  return {
    id: protocol.id,
    nombre: protocol.nombre,
    objetivo: protocol.descripcion,
    preparacion:
      protocol.pasos.length > 0
        ? protocol.pasos
        : ["Preparación pendiente de documentación oficial por ingeniería OVI."],
    equipos: protocol.equiposRequeridos,
    productos: protocol.productosRequeridos,
    diluciones:
      diluciones.length > 0
        ? diluciones
        : ["Dilución pendiente de documentación oficial para este protocolo."],
    frecuencia: protocol.frecuenciaRecomendada ?? "Pendiente documentación oficial",
    tiempo: protocol.tiempoEstimado ?? "Pendiente documentación oficial",
    normas_de_seguridad:
      normasDeSeguridad.length > 0
        ? normasDeSeguridad
        : ["Usar EPP completo, validar compatibilidades y seguir fichas técnicas oficiales."],
    buenas_practicas: [
      "Realizar prueba en área controlada antes de escalar la aplicación.",
      "Registrar evidencia de ejecución y resultados del protocolo.",
      "Mantener trazabilidad de consumo de agua y químicos por intervención.",
    ],
    sectores: protocol.sectores,
    tipo_de_suciedad: protocol.tiposSuciedad,
    superficies: protocol.superficiesCompatibles,
    estado: protocol.status,
  };
});
