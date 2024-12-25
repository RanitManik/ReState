import {
    Alert,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    showArrow = true,
}: SettingsItemProp) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex flex-row items-center justify-between py-3"
    >
        <View className="flex flex-row items-center gap-3">
            <Image source={icon} className="size-6" />
            <Text
                className={`font-rubik-medium text-lg text-black-300 ${textStyle}`}
            >
                {title}
            </Text>
        </View>

        {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
);

const Profile = () => {
    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert("Success", "Logged out successfully");
            refetch();
        } else {
            Alert.alert("Error", "Failed to logout");
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="mt-5 flex flex-row items-center justify-between">
                    <Text className="font-rubik-bold text-xl">Profile</Text>
                    <Image source={icons.bell} className="size-5" />
                </View>

                <View className="mt-5 flex flex-row justify-center">
                    <View className="relative mt-5 flex flex-col items-center">
                        <Image
                            source={{ uri: user?.avatar }}
                            className="relative size-44 rounded-full border border-gray-300"
                        />
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9" />
                        </TouchableOpacity>

                        <Text className="mt-2 font-rubik-bold text-2xl">
                            {user?.name}
                        </Text>
                    </View>
                </View>

                <View className="mt-10 flex flex-col">
                    <SettingsItem icon={icons.calendar} title="My Bookings" />
                    <SettingsItem icon={icons.wallet} title="Payments" />
                </View>

                <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} />
                    ))}
                </View>

                <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
                    <SettingsItem
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger"
                        showArrow={false}
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;