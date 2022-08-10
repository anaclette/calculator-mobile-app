import {useRef, useState} from 'react';

enum Operations {
  clean = 'C',
  positive_negative = '+/-',
  delete = 'del',
  add = '+',
  substract = '-',
  multiply = 'x',
  divide = '/',
  equal = '=',
}

export const useCalculator = () => {
  const [previousInput, setPreviousInput] = useState('0');
  const [inputNum, setInputNum] = useState('0');

  const lastOperation = useRef<Operations>();

  const onCleanPress = () => {
    setInputNum('0');
    setPreviousInput('0');
  };

  const buildNumber = (numText: string) => {
    // Reject double floating point
    if (inputNum.includes('.') && numText === '.') {
      return;
    }
    if (inputNum.startsWith('0') || inputNum.startsWith('-0')) {
      // decimal floating point
      if (numText === '.') {
        setInputNum(inputNum + numText);

        // check if input is another zero and outcome has a floating point
      } else if (numText === '0' && inputNum.includes('.')) {
        setInputNum(inputNum + numText);

        // check if input is diff from zero and outcome has no floating point
      } else if (numText !== '0' && !inputNum.includes('.')) {
        setInputNum(numText);

        // prevent from 0000.0
      } else if (numText === '0' && !inputNum.includes('.')) {
        setInputNum(inputNum);
      } else {
        setInputNum(inputNum + numText);
      }
    } else {
      setInputNum(inputNum + numText);
    }
  };

  const positiveNegative = () => {
    inputNum.includes('-')
      ? setInputNum(inputNum.replace('-', ''))
      : setInputNum('-' + inputNum);
  };
  const onDeletePress = () => {
    let negative = '';
    let temporaryValue = inputNum;
    if (inputNum.includes('-')) {
      negative = '-';
      temporaryValue = inputNum.substring(1);
    }

    if (temporaryValue.length > 1) {
      setInputNum(negative + temporaryValue.slice(0, -1));
    } else {
      setInputNum('0');
    }
  };

  const changeToPreviousValue = () => {
    if (inputNum.endsWith('.')) {
      setPreviousInput(inputNum.slice(0, -1));
    } else {
      setPreviousInput(inputNum);
    }
    setInputNum('0');
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
    const num1 = Number(inputNum);
    const num2 = Number(previousInput);

    switch (lastOperation.current) {
      case Operations.add:
        setInputNum(`${num1 + num2}`);
        break;

      case Operations.substract:
        setInputNum(`${num2 - num1}`);
        break;

      case Operations.multiply:
        setInputNum(`${num1 * num2}`);
        break;

      case Operations.divide:
        setInputNum(`${num2 / num1}`);
        break;
    }

    setPreviousInput('0');
  };

  return {
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
  };
};
