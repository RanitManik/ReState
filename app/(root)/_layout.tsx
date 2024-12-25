import { useGlobalContext } from "@/lib/global-provider";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    if (loading)
        return (
            <SafeAreaView className="flex h-full items-center justify-center bg-white">
                <ActivityIndicator className="text-primary" size="large" />
            </SafeAreaView>
        );

    if (!isLoggedIn) return <Redirect href="/sign-in" />;

    return <Slot />;
}
