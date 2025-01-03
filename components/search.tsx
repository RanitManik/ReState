import { View, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
    }, 500);

    function handleSearch(text: string) {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="mt-5 flex w-full flex-row items-center justify-between rounded-full border border-primary-100 bg-accent px-4 py-2">
            <View className="z-50 flex flex-1 flex-row items-center justify-start">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    placeholder="Search for anything..."
                    value={search}
                    onChangeText={handleSearch}
                    className="ml-2 flex-1 font-rubik-regular text-sm text-black-300"
                />
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className="size-5" />
            </TouchableOpacity>
        </View>
    );
};
export default Search;
