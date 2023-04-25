import { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

export default ImageWithFadeIn = ({ source, style }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [opacityValue]);

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.Image
        source={source}
        style={[
          style,
          { opacity: opacityValue, transform: [{ scale: animation }] },
        ]}
      />
    </TouchableOpacity>
  );
};
