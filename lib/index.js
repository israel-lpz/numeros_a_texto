function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _class_private_method_init(obj, privateSet) {
    _check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {});
})(this, function(exports1) {
    "use strict";
    Object.defineProperty(exports1, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports1, {
        NumerosATexto: function() {
            return NumerosATexto;
        },
        numerosATexto: function() {
            return numerosATexto;
        }
    });
    function Unidades(num) {
        const unidades = {
            1: "un",
            2: "dos",
            3: "tres",
            4: "cuatro",
            5: "cinco",
            6: "seis",
            7: "siete",
            8: "ocho",
            9: "nueve"
        };
        return unidades[num] ?? "";
    }
    const DecenasY = (strSin, numUnidades)=>strSin + (numUnidades > 0 ? ` y ${Unidades(numUnidades)}` : "");
    function Decenas(num) {
        let decena = Math.floor(num / 10);
        let unidad = num - decena * 10;
        console.log({
            decena,
            unidad
        });
        if (decena == 1) {
            const decenas10 = [
                "diez",
                "once",
                "doce",
                "trece",
                "catorce",
                "quince"
            ];
            return decenas10[unidad] ?? "dieci" + Unidades(num);
        } else if (decena == 2) return unidad == 0 ? "veinte" : "veinti" + Unidades(num);
        const decenas = {
            3: ()=>DecenasY("treinta", unidad),
            4: ()=>DecenasY("cuarenta", unidad),
            5: ()=>DecenasY("cincuenta", unidad),
            6: ()=>DecenasY("sesenta", unidad),
            7: ()=>DecenasY("setenta", unidad),
            8: ()=>DecenasY("ochenta", unidad),
            9: ()=>DecenasY("noventa", unidad)
        };
        console.log({
            result: decenas[decena]()
        });
        return decenas[decena]();
    }
    function Centenas(num) {
        let numCentenas = Math.floor(num / 100);
        let numDecenas = num - numCentenas * 100;
        console.log({
            numCentenas,
            numDecenas
        });
        const centenas = {
            1: ()=>numDecenas > 0 ? `ciento ${Decenas(numDecenas)}` : "cien",
            2: ()=>`doscientos ${Decenas(numDecenas)}`,
            3: ()=>`trescientos ${Decenas(numDecenas)}`,
            4: ()=>`cuatrocientos ${Decenas(numDecenas)}`,
            5: ()=>`quinientos ${Decenas(numDecenas)}`,
            6: ()=>`seiscientos ${Decenas(numDecenas)}`,
            7: ()=>`setecientos ${Decenas(numDecenas)}`,
            8: ()=>`ochocientos ${Decenas(numDecenas)}`,
            9: ()=>`novecientos ${Decenas(numDecenas)}`
        };
        return centenas[numCentenas]?.() ?? Decenas(numDecenas);
    }
    function Miles(num) {
        let divisor = 1e3;
        let miles = Math.floor(num / divisor);
        let resto = num - miles * divisor;
        let strMiles = Seccion(num, divisor, "mil", "mil");
        let strCentenas = Centenas(resto);
        console.log({
            divisor,
            miles,
            resto,
            strMiles,
            strCentenas
        });
        return strMiles == "" ? strCentenas : `${strMiles} ${strCentenas}`;
    }
    function Millones(num) {
        let divisor = 1e6;
        let cientos = Math.floor(num / divisor);
        let resto = num - cientos * divisor;
        let strMillones = Seccion(num, divisor, "un millon", "millones");
        let strMiles = Miles(resto);
        if (strMillones == "") return strMiles;
        if (strMiles == "") strMiles = "de";
        return strMillones + " " + strMiles;
    }
    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor);
        let resto = num - cientos * divisor;
        let letras = "";
        if (cientos > 0) {
            if (cientos > 1) letras = `${Centenas(cientos)} ${strPlural}`;
            else letras = strSingular;
        }
        if (resto > 0) letras += "";
        return letras;
    }
    var _makeDefault = new WeakSet(), _sanitizer = new WeakSet(), _capitalize = new WeakSet();
    class NumerosATexto {
        setConfig(newConfig) {
            this.config = _class_private_method_get(this, _makeDefault, makeDefault).call(this, newConfig);
        }
        getConfig() {
            return this.config;
        }
        convertir(num) {
            const data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: Math.round(num * 100) - Math.floor(num) * 100,
                letrasCentavos: ""
            };
            if (data.centavos > 0) data.letrasCentavos = "con " + Millones(data.centavos) + " " + (data.centavos == 1 ? this.config.letrasMonedaCentavoSingular : this.config.letrasMonedaCentavoPlural);
            if (data.enteros == 0) return "cero";
            const value = `${Millones(data.enteros)} ${data.enteros == 1 ? this.config.letrasMonedaSingular : this.config.letrasMonedaPlural} ${data.letrasCentavos}`;
            let sanitizedValue = _class_private_method_get(this, _sanitizer, sanitizer).call(this, value);
            return this.config.capitalize ? _class_private_method_get(this, _capitalize, capitalize).call(this, sanitizedValue) : sanitizedValue;
        }
        constructor(config = {}){
            _class_private_method_init(this, _makeDefault);
            _class_private_method_init(this, _sanitizer);
            _class_private_method_init(this, _capitalize);
            _define_property(this, "config", void 0);
            this.config = _class_private_method_get(this, _makeDefault, makeDefault).call(this, config);
        }
    }
    function makeDefault(newConfig) {
        return {
            letrasMonedaCentavoPlural: newConfig.letrasMonedaCentavoPlural ?? "",
            letrasMonedaCentavoSingular: newConfig.letrasMonedaCentavoSingular ?? "",
            letrasMonedaPlural: newConfig.letrasMonedaPlural ?? "",
            letrasMonedaSingular: newConfig.letrasMonedaSingular ?? "",
            capitalize: false
        };
    }
    function sanitizer(value) {
        return value.replace("  ", " ").trim();
    }
    function capitalize(value) {
        const newValue = value.toLowerCase();
        return newValue.charAt(0).toUpperCase() + newValue.slice(1);
    }
    const numerosATexto = new NumerosATexto();
});
