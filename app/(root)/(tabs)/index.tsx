import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/card";
import Filters from "@/components/filters";
import { useGlobalContext } from "@/lib/global-provider";

const Index = () => {
    const { user } = useGlobalContext();

    return (
        <SafeAreaView className="h-full bg-white">
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
                </View>
                <View className="flex flex-row gap-5">
                    <FeaturedCard
                        item={{
                            $id: "unique_document_id",
                            $collectionId: "collection_id",
                            $databaseId: "database_id",
                            $createdAt: "2024-12-26T12:00:00Z",
                            $updatedAt: "2024-12-26T12:00:00Z",
                            $permissions: [],
                            name: "Mount Fuji",
                            address: "Japan",
                            image: "https://cdn.britannica.com/47/80547-120-839DEBE4/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg",
                            rating: "4.8",
                            price: "200.00",
                        }}
                    />
                    <FeaturedCard
                        item={{
                            $id: "unique_document_id",
                            $collectionId: "collection_id",
                            $databaseId: "database_id",
                            $createdAt: "2024-12-26T12:00:00Z",
                            $updatedAt: "2024-12-26T12:00:00Z",
                            $permissions: [],
                            name: "Mount Fuji",
                            address: "Japan",
                            image: "https://cdn.britannica.com/47/80547-120-839DEBE4/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg",
                            rating: "4.8",
                            price: "200.00",
                        }}
                    />
                    <FeaturedCard
                        item={{
                            $id: "unique_document_id",
                            $collectionId: "collection_id",
                            $databaseId: "database_id",
                            $createdAt: "2024-12-26T12:00:00Z",
                            $updatedAt: "2024-12-26T12:00:00Z",
                            $permissions: [],
                            name: "Mount Fuji",
                            address: "Japan",
                            image: "https://cdn.britannica.com/47/80547-120-839DEBE4/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg",
                            rating: "4.8",
                            price: "200.00",
                        }}
                    />
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
                <View className="flex flex-row gap-5">
                    <Card
                        item={{
                            $id: "unique_document_id",
                            $collectionId: "collection_id",
                            $databaseId: "database_id",
                            $createdAt: "2024-12-26T12:00:00Z",
                            $updatedAt: "2024-12-26T12:00:00Z",
                            $permissions: [],
                            name: "Mount Fuji",
                            address: "Japan",
                            image: "https://cdn.britannica.com/47/80547-120-839DEBE4/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg",
                            rating: "4.8",
                            price: "200.00",
                        }}
                    />
                    <Card
                        item={{
                            $id: "unique_document_id",
                            $collectionId: "collection_id",
                            $databaseId: "database_id",
                            $createdAt: "2024-12-26T12:00:00Z",
                            $updatedAt: "2024-12-26T12:00:00Z",
                            $permissions: [],
                            name: "Mount Fuji",
                            address: "Japan",
                            image: "https://cdn.britannica.com/47/80547-120-839DEBE4/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg",
                            rating: "4.8",
                            price: "200.00",
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
export default Index;
