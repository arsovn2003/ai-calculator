// app/(tabs)/_layout.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // За икони
import { Tabs } from 'expo-router'; // За табови
import { useColorScheme } from '@/hooks/useColorScheme'; // За боја на позадина

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Автоматско детектирање на боја на позадина

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // Бои за активен таб
        tabBarInactiveTintColor: 'gray', // Бои за неактивен таб
        headerShown: false, // Не прикажувај хедер
        tabBarStyle: {
          backgroundColor: '#fff', // Позиционирање на табови
        },
      }}
    >
      {/* Таб за Loss Function Calculator */}
      <Tabs.Screen
        name="loss" // Назив на табот
        options={{
          title: 'Loss Function',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} /> // Икона за Loss Function
          ),
        }}
      />

      {/* Таб за Optimizer Calculator */}
      <Tabs.Screen
        name="optimizer" // Назив на табот
        options={{
          title: 'Optimizer',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} /> // Икона за Optimizer
          ),
        }}
      />
    </Tabs>
  );
}
