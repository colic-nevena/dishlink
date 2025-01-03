import React from "react";
import { TabBarIcon } from "@/components/TabBarIcon";
import colors from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs 
            screenOptions={{
            tabBarActiveTintColor: colors.primary,
            headerShown: false,
            tabBarStyle: { paddingBottom: 5 }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />),
                }}
            />

            <Tabs.Screen 
                name="my-cookbook" 
                options={{
                    title: 'My Cookbook',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />),
                }}
            />

            <Tabs.Screen 
                name="add-new-recipe" 
                options={{
                    title: 'Add Recipe',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />),
                }}
            />

            <Tabs.Screen 
                name="friends" 
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />),
                }}
            />            
            
            <Tabs.Screen 
                name="account" 
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />),
                }}
            />
        </Tabs>
    )
}