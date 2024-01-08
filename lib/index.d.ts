type IConfig = {
    letrasMonedaPlural: string;
    letrasMonedaSingular: string;
    letrasMonedaCentavoSingular: string;
    letrasMonedaCentavoPlural: string;
    capitalize: boolean;
};
export declare class NumerosATexto {
    #private;
    constructor();
    private config;
    setConfig(newConfig: Partial<IConfig>): void;
    getConfig(): IConfig;
    convertir(num: number): string;
}
export declare const numerosATexto: NumerosATexto;
export {};
