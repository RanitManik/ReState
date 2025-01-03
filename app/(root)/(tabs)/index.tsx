import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/card";
import Filters from "@/components/filters";
import { useGlobalContext } from "@/lib/global-provider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import NoResults from "@/components/NoResults";

const Index = () => {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({
            fn: getLatestProperties,
        });

    const {
        data: properties,
        loading: propertiesLoading,
        refetch: propertiesRefetch,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    });

    const handleCardPress = useCallback((id: string) => {
        router.push(`/properties/${id}`);
    }, []);

    useEffect(() => {
        propertiesRefetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        });
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="h-full bg-white">
            <FlatList
                data={properties}
                renderItem={({ item }) => {
                    return (
                        <Card
                            item={item}
                            onPress={() => handleCardPress(item.$id)}
                        />
                    );
                }}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="mt-5 flex flex-row items-center justify-between">
                            <View className="flex flex-row items-center">
                                <Image
                                    className="size-12 rounded-full"
                                    source={{ uri: user?.avatar }}
                                />
                                <View className="ml-2 flex flex-col items-start justify-center">
                                    <Text className="font-rubik-regular text-xs text-black-200">
                                        Good Morning
                                    </Text>
                                    <Text className="font-rubik-medium text-base text-black-300">
                                        Ranit Manik
                                    </Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className="size-6" />
                        </View>
                        <Search />
                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="font-rubik-semibold text-lg text-black-300">
                                    Featured
                                </Text>
                                <TouchableOpacity>
                                    <Text className="font-rubik-medium text-lg text-primary">
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {latestPropertiesLoading ? (
                                <ActivityIndicator
                                    size="large"
                                    className="mt-5 text-primary"
                                />
                            ) : !latestProperties ||
                              latestProperties.length === 0 ? (
                                <NoResults />
                            ) : (
                                <FlatList
                                    keyExtractor={(item) => item.$id}
                                    horizontal
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName="flex gap-5 mt-5"
                                    data={latestProperties}
                                    renderItem={({ item }) => (
                                        <FeaturedCard
                                            item={item}
                                            onPress={() =>
                                                handleCardPress(item.$id)
                                            }
                                        />
                                    )}
                                />
                            )}
                        </View>
                        <View className="mt-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="font-rubik-semibold text-lg text-black-300">
                                    Our Recommendations
                                </Text>
                                <TouchableOpacity>
                                    <Text className="font-rubik-medium text-lg text-primary">
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Filters />
                    </View>
                }
                ListEmptyComponent={
                    propertiesLoading ? (
                        <ActivityIndicator
                            size="large"
                            className="mt-5 text-primary"
                        />
                    ) : (
                        <NoResults />
                    )
                }
            />
        </SafeAreaView>
    );
};
export default Index;
