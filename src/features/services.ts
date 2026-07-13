const FOOD_VISUAL_CLASS_NAME =
  "bg-[radial-gradient(circle_at_30%_30%,rgba(186,232,146,0.95),transparent_20%),radial-gradient(circle_at_20%_62%,rgba(116,161,45,0.92),transparent_16%),radial-gradient(circle_at_78%_24%,rgba(93,54,24,0.9),transparent_28%),radial-gradient(circle_at_64%_58%,rgba(211,132,61,0.85),transparent_20%),linear-gradient(135deg,#111319_0%,#2b170f_42%,#5f3617_100%)]";

const HOTEL_VISUAL_CLASS_NAME =
  "bg-[linear-gradient(135deg,rgba(228,212,179,0.95)_0%,rgba(193,151,100,0.92)_24%,rgba(123,82,48,0.96)_55%,rgba(67,45,28,0.98)_100%),radial-gradient(circle_at_30%_20%,rgba(255,245,225,0.9),transparent_20%),repeating-linear-gradient(90deg,transparent_0_18%,rgba(79,50,27,0.32)_18%_22%)]";

const INSTITUTIONAL_VISUAL_CLASS_NAME =
  "bg-[radial-gradient(circle_at_68%_70%,rgba(12,57,106,0.55),transparent_18%),linear-gradient(180deg,#eef4ff_0%,#dcecff_42%,#9ed7f5_70%,#53b0e9_100%),repeating-linear-gradient(96deg,rgba(255,255,255,0)_0_9%,rgba(43,115,180,0.24)_9%_10.5%)]";

export const services = [
  {
    title: "OVI Alimentos",
    description:
      "Nuestra línea de productos especializada en limpieza, tratamiento y mantenimiento de la industria alimentaria da resultados eficaces que ayudan a crear un ambiente más limpio, seguro y saludable.",
    visualClassName: FOOD_VISUAL_CLASS_NAME,
  },
  {
    title: "OVI Hotelera",
    description:
      "Nuestra línea de productos profesional especializada en el sector hotelero da resultados eficaces y ayuda a que todos los espacios del hotel cumplan con las expectativas de los huéspedes y visitantes.",
    visualClassName: HOTEL_VISUAL_CLASS_NAME,
  },
  {
    title: "OVI Institucional",
    description:
      "Nuestra línea de productos especializada en limpieza, tratamiento y mantenimiento de superficies para el sector institucional da resultados eficaces y ayuda a crear ambientes seguros, armoniosos e higiénicos.",
    visualClassName: INSTITUTIONAL_VISUAL_CLASS_NAME,
  },
] as const;
