import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black',
  },
  calculatorContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  result: {
    fontSize: 60,
    textAlign: 'right',
    color: 'white',
  },
  previousResult: {
    fontSize: 30,
    textAlign: 'right',
    color: 'rgba(255,255,255,0.5)',
  },
  rowOperators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  grayItem: {
    backgroundColor: '#9B9B9B',
  },
  darkGrayItem: {
    backgroundColor: '#2D2D2D',
    color: 'gray',
  },
  orangeItem: {
    color: 'white',
    backgroundColor: '#FF9427',
  },
  colOperators: {
    alignItems: 'flex-end',
  },
  integers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    justifyContent: 'center',
  },
  rowColumns: {
    flexDirection: 'row-reverse',
  },
});
