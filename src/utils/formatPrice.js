export function formatearPrecio(precio) {
  let opciones = { style: "currency", currency: "ARS" };
  let precioFormateado = precio.toLocaleString("es-AR", opciones);

  if (precioFormateado.indexOf(",") === -1) {
    precioFormateado += ",00";
  }

  return precioFormateado;
}
