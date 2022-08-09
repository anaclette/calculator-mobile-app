import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {CalculatorButton} from '../components/CalculatorButton';
import {styles} from '../theme/appTheme';

export const Calculator = () => {
  const [previousResult, setPreviousResult] = useState('0');
  const [result, setResult] = useState('0');
  const OPERATORS = {
    DEL: 'C',
    POSITIVE_NEGATIVE: '+/-',
    PERCENTAGE: '%',
    DIVIDE: '÷',
    MULTIPLY: 'x',
    SUBTRACTION: '-',
    ADD: '+',
    EQUALS: '=',
  };

  const onDeletePress = () => {
    setResult('0');
  };

  const getResult = (num: string) => {
    setResult(result + num);
  };

  const positiveNegative = () => {
    if (result.includes('-')) {
      setResult(result.replace('-', ''));
    } else {
      setResult('-' + result);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.calculatorContainer}>
        <Text style={styles.previousResult}>{previousResult}</Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.result}>
          {result}
        </Text>

        <View style={styles.rowOperators}>
          <CalculatorButton
            onPress={onDeletePress}
            color={styles.grayItem}
            operator={OPERATORS.DEL}
          />
          <CalculatorButton
            onPress={positiveNegative}
            color={styles.grayItem}
            operator={OPERATORS.POSITIVE_NEGATIVE}
          />
          <CalculatorButton
            onPress={getResult}
            color={styles.grayItem}
            operator={OPERATORS.PERCENTAGE}
          />
          <CalculatorButton
            onPress={getResult}
            color={styles.orangeItem}
            operator={OPERATORS.DIVIDE}
          />
        </View>

        <View style={styles.rowColumns}>
          <View style={styles.colOperators}>
            <CalculatorButton
              onPress={getResult}
              color={styles.orangeItem}
              operator={OPERATORS.MULTIPLY}
            />
            <CalculatorButton
              onPress={getResult}
              color={styles.orangeItem}
              operator={OPERATORS.SUBTRACTION}
            />
            <CalculatorButton
              onPress={getResult}
              color={styles.orangeItem}
              operator={OPERATORS.ADD}
            />
            <CalculatorButton
              onPress={getResult}
              color={styles.orangeItem}
              operator={OPERATORS.EQUALS}
            />
          </View>

          <View style={styles.integers}>
            {Array.from(Array(10).keys())
              .reverse()
              .map((chart: number) =>
                chart === 0 ? (
                  <CalculatorButton
                    onPress={getResult}
                    extraStyle
                    color={styles.darkGrayItem}
                    operator={String(chart)}
                  />
                ) : (
                  <CalculatorButton
                    onPress={getResult}
                    color={styles.darkGrayItem}
                    operator={String(chart)}
                  />
                ),
              )}
            <CalculatorButton
              onPress={getResult}
              color={styles.darkGrayItem}
              operator="."
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
