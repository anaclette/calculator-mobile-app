import React from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {styles} from './calculatorButton.style';

interface Props {
  operator: string;
  color?: ViewStyle;
  extraStyle?: boolean;
  onPress: (operation: string) => void;
}

export const CalculatorButton = ({
  operator,
  color,
  extraStyle,
  onPress,
}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => onPress(operator)}
      style={[styles.numContainer, color, extraStyle && styles.larger]}>
      <Text style={[[styles.numBtn, color], {fontSize: width / 22 + 5}]}>
        {operator}
      </Text>
    </TouchableOpacity>
  );
};
