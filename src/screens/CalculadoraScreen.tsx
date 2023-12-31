import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';
import { useCalculator } from '../hooks/useCalculator';


export const CalculadoraScreen = () => {

    const {
        numero,
        numeroAnt,
        armarNumero,
        clean,
        positionNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    } = useCalculator();

    useEffect(() => {
        SplashScreen.hide();
    }, []);


    return (
        <View style={ styles.calculadorContainer }>
            {
                ( numeroAnt !== '0' ) &&
                <Text style={ styles.resultadoSub }>{ numeroAnt }</Text>
            }
            <Text
                style={ styles.resultado }
                numberOfLines={ 1 }
                adjustsFontSizeToFit
            >
                { numero }
            </Text>

            {/* Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="C" color="#9B9B9B" accion={ clean }/>
                <BotonCalc texto="+/-" color="#9B9B9B" accion={ positionNegativo }/>
                <BotonCalc texto="del" color="#9B9B9B" accion={ btnDelete }/>
                <BotonCalc texto="/" color="#FF9427" accion={ btnDividir }/>
            </View>

            {/* Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="7" accion={ armarNumero }/>
                <BotonCalc texto="8" accion={ armarNumero }/>
                <BotonCalc texto="9" accion={ armarNumero }/>
                <BotonCalc texto="X" color="#FF9427" accion={ btnMultiplicar }/>
            </View>

            {/* Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="4" accion={ armarNumero }/>
                <BotonCalc texto="5" accion={ armarNumero }/>
                <BotonCalc texto="6" accion={ armarNumero }/>
                <BotonCalc texto="-" color="#FF9427" accion={ btnRestar }/>
            </View>

            {/* Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="1" accion={ armarNumero }/>
                <BotonCalc texto="2" accion={ armarNumero }/>
                <BotonCalc texto="3" accion={ armarNumero }/>
                <BotonCalc texto="+" color="#FF9427" accion={ btnSumar }/>
            </View>

            {/* Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="0"  accion={ armarNumero } ancho/>
                <BotonCalc texto="." accion={ armarNumero } />
                <BotonCalc texto="=" color="#FF9427" accion={ calcular }/>
            </View>
        </View>
    );
};
