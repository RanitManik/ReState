import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    const handleLogin = async () => {
        const result = await login();

        if (!loading && isLoggedIn) return <Redirect href="/" />;

        if (result) {
            refetch();
        } else {
            Alert.alert("login error");
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView contentContainerClassName="h-full">
                <Image
                    source={images.onboarding}
                    className="h-4/6 w-full"
                    resizeMode="contain"
                />
                <View className="px-10">
                    <Text className="text-center font-rubik-regular text-base text-black-200">
                        Welcome to <Text className="text-primary">ReState</Text>
                    </Text>
                    <Text className="mt-2 text-center font-rubik-bold text-3xl text-black-300">
                        Let's Get You Closer to {"\n"}
                        <Text className="text-primary">Your Ideal Home</Text>
                    </Text>
                    <Text className="font-rubik mt-12 text-center text-lg text-black-200">
                        Login to ReState with Google
                    </Text>
                    <TouchableOpacity
                        className="mt-5 w-full rounded-full border border-zinc-100 bg-white py-4 shadow-md shadow-zinc-400"
                        onPress={handleLogin}
                    >
                        <View className="flex w-full flex-row items-center justify-center gap-2">
                            <Image
                                source={icons.google}
                                className="h-5 w-5"
                                resizeMode="contain"
                            />
                            <Text className="font-rubik-medium text-lg text-black-300">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignIn;
