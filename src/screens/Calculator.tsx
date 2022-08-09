/* eslint-disable curly */
import React, {useRef, useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {CalculatorButton} from '../components/CalculatorButton';
import {styles} from '../theme/appTheme';

enum Operations {
  add,
  substract,
  multiply,
  divide,
}

export const Calculator = () => {
  const [previousResult, setPreviousResult] = useState('0');
  const [result, setResult] = useState('0');

  const lastOperation = useRef<Operations>();

  const OPERATORS = {
    CLEAN: 'C',
    POSITIVE_NEGATIVE: '+/-',
    DEL: 'del',
    DIVIDE: '÷',
    MULTIPLY: 'x',
    SUBTRACTION: '-',
    ADD: '+',
    EQUALS: '=',
  };

  const onCleanPress = () => {
    setResult('0');
    setPreviousResult('0');
  };

  const getResult = (num: string) => {
    // Reject double floating point
    if (result.includes('.') && num === '.') return;
    if (result.startsWith('0') || result.startsWith('-0')) {
      // decimal floating point
      if (num === '.') {
        setResult(result + num);

        // check if input is another zero and has floating point
      } else if (num === '0' && num.includes('.')) {
        setResult(result + num);

        // check if input is diff from zero and has no floating point
      } else if (result !== '0' && !num.includes('.')) {
        setResult(num);

        // prevent from 0000.0
      } else if (num === '0' && !result.includes('.')) {
        setResult(result);
      } else {
        setResult(result + num);
      }
    } else {
      setResult(result + num);
    }
  };

  const positiveNegative = () => {
    if (result.includes('-')) {
      setResult(result.replace('-', ''));
    } else {
      setResult('-' + result);
    }
  };

  const onDeletePress = () => {
    let negative = '';
    let temporaryValue = result;
    if (result.includes('-')) {
      negative = '-';
      temporaryValue = result.substring(1);
    }

    if (temporaryValue.length > 1) {
      setResult(negative + temporaryValue.slice(0, -1));
    } else {
      setResult('0');
    }
  };

  const changeToPreviousValue = () => {
    if (result.endsWith('.')) {
      setPreviousResult(result.slice(0, -1));
    } else {
      setPreviousResult(result);
    }
    setResult('0');
  };

  const onDividePress = () => {
    changeToPreviousValue();
    lastOperation.current = Operations.divide;
  };

  const onMultiplyPress = () => {
    changeToPreviousValue();
    lastOperation.current = Operations.multiply;
  };
  const onSubstractPress = () => {
    changeToPreviousValue();
    lastOperation.current = Operations.substract;
  };
  const onAddPress = () => {
    changeToPreviousValue();
    lastOperation.current = Operations.add;
  };

  const calculate = () => {
    const num1 = Number(result);
    const num2 = Number(previousResult);

    switch (lastOperation.current) {
      case Operations.add:
        setResult(`${num1 + num2}`);
        break;

      case Operations.substract:
        setResult(`${num2 - num1}`);
        break;

      case Operations.multiply:
        setResult(`${num1 * num2}`);
        break;

      case Operations.divide:
        setResult(`${num2 / num1}`);
        break;
    }

    setPreviousResult('0');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.calculatorContainer}>
        {previousResult !== '0' && (
          <Text style={styles.previousResult}>{previousResult}</Text>
        )}
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.result}>
          {result}
        </Text>

        <View style={styles.rowOperators}>
          <CalculatorButton
            onPress={onCleanPress}
            color={styles.grayItem}
            operator={OPERATORS.CLEAN}
          />
          <CalculatorButton
            onPress={positiveNegative}
            color={styles.grayItem}
            operator={OPERATORS.POSITIVE_NEGATIVE}
          />
          <CalculatorButton
            onPress={onDeletePress}
            color={styles.grayItem}
            operator={OPERATORS.DEL}
          />
          <CalculatorButton
            onPress={onDividePress}
            color={styles.orangeItem}
            operator={OPERATORS.DIVIDE}
          />
        </View>

        <View style={styles.rowColumns}>
          <View style={styles.colOperators}>
            <CalculatorButton
              onPress={onMultiplyPress}
              color={styles.orangeItem}
              operator={OPERATORS.MULTIPLY}
            />
            <CalculatorButton
              onPress={onSubstractPress}
              color={styles.orangeItem}
              operator={OPERATORS.SUBTRACTION}
            />
            <CalculatorButton
              onPress={onAddPress}
              color={styles.orangeItem}
              operator={OPERATORS.ADD}
            />
            <CalculatorButton
              onPress={calculate}
              color={styles.orangeItem}
              operator={OPERATORS.EQUALS}
            />
          </View>

          <View style={styles.integers}>
            {Array.from(Array(10).keys())
              .reverse()
              .map((chart: number, index) =>
                chart === 0 ? (
                  <CalculatorButton
                    key={String(`${chart}_${index}`)}
                    onPress={getResult}
                    extraStyle
                    color={styles.darkGrayItem}
                    operator={String(chart)}
                  />
                ) : (
                  <CalculatorButton
                    key={String(`${chart}_${index}`)}
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
