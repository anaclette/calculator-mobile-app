import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {CalculatorButton} from '../components/CalculatorButton';
import {styles} from '../theme/appTheme';
import {useCalculator} from '../hooks/useCalculator';

export const Calculator = () => {
  const {
    onCleanPress,
    buildNumber,
    positiveNegative,
    onDeletePress,
    onDividePress,
    onMultiplyPress,
    onSubstractPress,
    onAddPress,
    calculate,
    Operations,
    inputNum,
    previousInput,
  } = useCalculator();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.calculatorContainer}>
        {previousInput !== '0' && (
          <Text style={styles.previousInput}>{previousInput}</Text>
        )}
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.inputNum}>
          {inputNum}
        </Text>

        <View style={styles.rowOperators}>
          <CalculatorButton
            onPress={onCleanPress}
            color={styles.grayItem}
            operator={Operations.clean}
          />
          <CalculatorButton
            onPress={positiveNegative}
            color={styles.grayItem}
            operator={Operations.positive_negative}
          />
          <CalculatorButton
            onPress={onDeletePress}
            color={styles.grayItem}
            operator={Operations.delete}
          />
          <CalculatorButton
            onPress={onDividePress}
            color={styles.orangeItem}
            operator={Operations.divide}
          />
        </View>

        <View style={styles.rowColumns}>
          <View style={styles.colOperators}>
            <CalculatorButton
              onPress={onMultiplyPress}
              color={styles.orangeItem}
              operator={Operations.multiply}
            />
            <CalculatorButton
              onPress={onSubstractPress}
              color={styles.orangeItem}
              operator={Operations.substract}
            />
            <CalculatorButton
              onPress={onAddPress}
              color={styles.orangeItem}
              operator={Operations.add}
            />
            <CalculatorButton
              onPress={calculate}
              color={styles.orangeItem}
              operator={Operations.equal}
            />
          </View>

          <View style={styles.integers}>
            {Array.from(Array(10).keys())
              .reverse()
              .map((chart: number, index) =>
                chart === 0 ? (
                  <CalculatorButton
                    key={String(`${chart}_${index}`)}
                    onPress={buildNumber}
                    extraStyle
                    color={styles.darkGrayItem}
                    operator={String(chart)}
                  />
                ) : (
                  <CalculatorButton
                    key={String(`${chart}_${index}`)}
                    onPress={buildNumber}
                    color={styles.darkGrayItem}
                    operator={String(chart)}
                  />
                ),
              )}
            <CalculatorButton
              onPress={buildNumber}
              color={styles.darkGrayItem}
              operator="."
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
