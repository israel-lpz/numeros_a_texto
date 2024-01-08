import { expect, jest, test } from '@jest/globals';
import { NumerosATexto } from '../lib';

// describe('Conversiones', () => {
test.concurrent('0 -> cero', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(0)).toBe('cero');
});

test.concurrent('11 -> once', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(11)).toBe('once');
});

test.concurrent('16 -> dieciseis', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(11)).toBe('once');
});

test.concurrent('20 -> veinte', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(20)).toBe('veinte');
});

test.concurrent('100 -> cien', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(20)).toBe('veinte');
});

test.concurrent('120 -> ciento y veinte', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(20)).toBe('veinte');
});

test.concurrent('125 -> ciento y veintecinco', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(20)).toBe('veinte');
});

test.concurrent('1534 -> mil quinientos treinta y cuatro', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(1534)).toBe('mil quinientos treinta y cuatro');
});

test.concurrent('26 -> Ventiseis', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(1534)).toBe('mil quinientos treinta y cuatro');
});

test.concurrent('1243253 -> un millon doscientos cuarenta y tres mil y doscientos cincuenta y tres', async () => {
    const numerosATexto = new NumerosATexto();
    expect(numerosATexto.convertir(1243253)).toBe(
        'un millon doscientos cuarenta y tres mil doscientos cincuenta y tres',
    );
});
