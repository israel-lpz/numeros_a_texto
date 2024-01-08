function Unidades(num: number) {
    const unidades: Record<number, string> = {
        1: 'un',
        2: 'dos',
        3: 'tres',
        4: 'cuatro',
        5: 'cinco',
        6: 'seis',
        7: 'siete',
        8: 'ocho',
        9: 'nueve',
    };
    return unidades[num] ?? '';
}

const DecenasY = (strSin: string, numUnidades: number) =>
    strSin + (numUnidades > 0 ? ` y ${Unidades(numUnidades)}` : '');

function Decenas(num: number) {
    let decena = Math.floor(num / 10);
    let unidad = num - decena * 10;

    console.log({ decena, unidad });
    if (decena == 1) {
        const decenas10 = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince'];
        return decenas10[unidad] ?? 'dieci' + Unidades(num);
    } else if (decena == 2) {
        return unidad == 0 ? 'veinte' : 'veinti' + Unidades(num);
    }
    const decenas: Record<number, () => string> = {
        3: () => DecenasY('treinta', unidad),
        4: () => DecenasY('cuarenta', unidad),
        5: () => DecenasY('cincuenta', unidad),
        6: () => DecenasY('sesenta', unidad),
        7: () => DecenasY('setenta', unidad),
        8: () => DecenasY('ochenta', unidad),
        9: () => DecenasY('noventa', unidad),
    };
    console.log({ result: decenas[decena]() });
    return decenas[decena]();
}

function Centenas(num: number) {
    let numCentenas = Math.floor(num / 100);
    let numDecenas = num - numCentenas * 100;
    console.log({ numCentenas, numDecenas });
    const centenas: Record<number, () => string> = {
        1: () => (numDecenas > 0 ? `ciento ${Decenas(numDecenas)}` : 'cien'),
        2: () => `doscientos ${Decenas(numDecenas)}`,
        3: () => `trescientos ${Decenas(numDecenas)}`,
        4: () => `cuatrocientos ${Decenas(numDecenas)}`,
        5: () => `quinientos ${Decenas(numDecenas)}`,
        6: () => `seiscientos ${Decenas(numDecenas)}`,
        7: () => `setecientos ${Decenas(numDecenas)}`,
        8: () => `ochocientos ${Decenas(numDecenas)}`,
        9: () => `novecientos ${Decenas(numDecenas)}`,
    };
    return centenas[numCentenas]?.() ?? Decenas(numDecenas);
    //   default return Decenas(numDecenas);
}

function Miles(num: number) {
    let divisor = 1e3;
    let miles = Math.floor(num / divisor);
    let resto = num - miles * divisor;

    let strMiles = Seccion(num, divisor, 'mil', 'mil');
    let strCentenas = Centenas(resto);

    console.log({ divisor, miles, resto, strMiles, strCentenas });
    return strMiles == '' ? strCentenas : `${strMiles} ${strCentenas}`;
}

function Millones(num: number) {
    let divisor = 1e6;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    //    let de = "";
    let strMillones = Seccion(num, divisor, 'un millon', 'millones');
    let strMiles = Miles(resto);

    if (strMillones == '') return strMiles;

    if (strMiles == '') strMiles = 'de';

    return strMillones + ' ' + strMiles;
}

function Seccion(num: number, divisor: number, strSingular: string, strPlural: string) {
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;

    let letras = '';

    if (cientos > 0)
        if (cientos > 1) letras = `${Centenas(cientos)} ${strPlural}`;
        else letras = strSingular;

    if (resto > 0) letras += '';

    return letras;
}

type IConfig = {
    letrasMonedaPlural: string;
    letrasMonedaSingular: string;
    letrasMonedaCentavoSingular: string;
    letrasMonedaCentavoPlural: string;
    capitalize: boolean;
};

export class NumerosATexto {
    constructor(config: Partial<IConfig> = {}) {
        this.config = this.#makeDefault(config);
    }

    private config: IConfig;

    #makeDefault(newConfig: Partial<IConfig>): IConfig {
        return {
            letrasMonedaCentavoPlural: newConfig.letrasMonedaCentavoPlural ?? '',
            letrasMonedaCentavoSingular: newConfig.letrasMonedaCentavoSingular ?? '',
            letrasMonedaPlural: newConfig.letrasMonedaPlural ?? '',
            letrasMonedaSingular: newConfig.letrasMonedaSingular ?? '',
            capitalize: false,
        };
    }

    setConfig(newConfig: Partial<IConfig>) {
        this.config = this.#makeDefault(newConfig);
    }

    getConfig() {
        return this.config;
    }

    #sanitizer(value: string) {
        return value.replace('  ', ' ').trim();
    }

    #capitalize(value: string): string {
        const newValue = value.toLowerCase();
        return newValue.charAt(0).toUpperCase() + newValue.slice(1);
    }

    public convertir(num: number) {
        const data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: Math.round(num * 100) - Math.floor(num) * 100,
            letrasCentavos: '',
        };

        if (data.centavos > 0) {
            data.letrasCentavos =
                'con ' +
                Millones(data.centavos) +
                ' ' +
                (data.centavos == 1 ? this.config.letrasMonedaCentavoSingular : this.config.letrasMonedaCentavoPlural);
        }
        if (data.enteros == 0) return 'cero';

        const value = `${Millones(data.enteros)} ${
            data.enteros == 1 ? this.config.letrasMonedaSingular : this.config.letrasMonedaPlural
        } ${data.letrasCentavos}`;
        let sanitizedValue = this.#sanitizer(value);
        return this.config.capitalize ? this.#capitalize(sanitizedValue) : sanitizedValue;
    }
}

export const numerosATexto = new NumerosATexto();
