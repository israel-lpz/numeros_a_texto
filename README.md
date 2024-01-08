# Librería Numeros_a_Texto

Esta librería convierte números en sus equivalentes textuales en español. Puede ser utilizada para generar representaciones en palabras de cantidades numéricas, útil en contextos como la generación de cheques, facturas u otros documentos financieros.

## Instalación

Puedes instalar la librería utilizando npm:

```bash
npm install numeros_a_texto
```

## Uso

```javascript
import { numerosATexto } from 'numeros_a_texto';

// Crear una instancia con configuración opcional
const configuracion = {
    letrasMonedaPlural: 'dólares',
    letrasMonedaSingular: 'dólar',
    letrasMonedaCentavoSingular: 'centavo',
    letrasMonedaCentavoPlural: 'centavos',
    capitalize: true,
};

const conversor = new NumerosATexto(configuracion);

// Convertir un número a texto
const resultado = conversor.convertir(123456.78);
console.log(resultado); // "Ciento Veintitrés Mil Cuatrocientos Cincuenta y Seis Dólares con Setenta y Ocho Centavos"
```

## Configuración

Puedes personalizar la configuración al crear una instancia de la clase `NumerosATexto`. Aquí están las opciones disponibles:

- `letrasMonedaPlural`: Texto a utilizar para la moneda en plural.
- `letrasMonedaSingular`: Texto a utilizar para la moneda en singular.
- `letrasMonedaCentavoPlural`: Texto a utilizar para los centavos en plural.
- `letrasMonedaCentavoSingular`: Texto a utilizar para los centavos en singular.
- `capitalize`: Convierte la primera letra a mayúscula si está activado.

## Ejemplos

```javascript
const conversor = new NumerosATexto();

// Convertir números a texto
console.log(conversor.convertir(123456789)); // "Ciento Veintitrés Millones Cuatrocientos Cincuenta y Seis Mil Setecientos Ochenta y Nueve"
console.log(conversor.convertir(987654321.01)); // "Novecientos Ochenta y Siete Millones Seiscientos Cincuenta y Cuatro Mil Trescientos Veintiuno Dólares con Uno Centavo"
```

## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias de mejora, por favor abre un [issue](https://github.com/israel-lpz/numeros_a_texto/issues).

## Licencia

Esta librería está bajo la licencia [MIT](LICENSE).
