import { Text, View } from "react-native";
import React from "react";

const Index = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="my-10 text-4xl font-light text-black">
                Welcome to ReState
            </Text>
        </View>
    );
};
export default Index;
