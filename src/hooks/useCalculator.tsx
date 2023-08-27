import { useRef, useState } from 'react';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculator = () => {

    const [numero, setNumero] = useState('0');
    const [numeroAnt, setNumeroAnt] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const clean = () => {
        setNumero('0');
        setNumeroAnt('0');
    };

    const armarNumero = ( numeroTexto: string ) => {
        //No aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.' ) {return;}

        if ( numero.startsWith('0') || numero.startsWith('-0') ) {
            //Punto Decimal
            if ( numeroTexto === '.' ) {
                setNumero( numero + numeroTexto );

                //Evaluar si es otro cero y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                setNumero( numero + numeroTexto );

                //Evaluar si es diff de cero y no tiene punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                setNumero(numeroTexto);

                //Evitar 0000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero(numero);

            } else {
                setNumero( numero + numeroTexto );
            }
        } else {
            setNumero( numero + numeroTexto );
        }

    };

    const positionNegativo = () => {
        if ( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }
    };

    const btnDelete = () => {
        let negativo = '';
        let numeroTemp = numero;

        if ( numero.includes('-') ) {
            negativo = '-';
            numeroTemp = numero.replace('-','');
        }

        if ( numeroTemp.length > 1 ) {
            setNumero( negativo + numeroTemp.slice(0, -1) );
        } else {
            setNumero('0');
        }
    };


    const cambiarNumByAnt = () => {
        if ( numero.endsWith('.') ) {
            setNumeroAnt(numero.slice(0,-1));
        } else {
            setNumeroAnt(numero);
        }
        setNumero('0');
    };


    const btnDividir = () => {
        cambiarNumByAnt();
        ultimaOperacion.current = Operadores.dividir;
    };

    const btnRestar = () => {
        cambiarNumByAnt();
        ultimaOperacion.current = Operadores.restar;
    };

    const btnMultiplicar = () => {
        cambiarNumByAnt();
        ultimaOperacion.current = Operadores.multiplicar;
    };

    const btnSumar = () => {
        cambiarNumByAnt();
        ultimaOperacion.current = Operadores.sumar;
    };

    const calcular = () => {
        const num1 = Number( numero );
        const num2 = Number( numeroAnt );

        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero(`${ num1 + num2 }`);
                break;

            case Operadores.restar:
                setNumero(`${ num2 - num1 }`);
                break;

            case Operadores.multiplicar:
                setNumero(`${ num1 * num2 }`);
                break;

            case Operadores.dividir:
                if ( num1 === 0 ) {
                    return;
                } else {
                    setNumero(`${ num2 / num1 }`);
                }
                break;
        }

        setNumeroAnt('0');
    };

    return {
        numeroAnt,
        numero,
        clean,
        positionNegativo,
        btnDelete,
        btnDividir,
        btnRestar,
        btnMultiplicar,
        btnSumar,
        calcular,
        armarNumero,
    };
};
