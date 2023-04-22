import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default ImageWithFadeIn = ({ source, style }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [opacityValue]);

  return (
    <View>
      <Animated.Image
        source={source}
        style={[style, { opacity: opacityValue }]}
      />
    </View>
  );
};
