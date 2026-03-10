import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1A1A2E" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="property/[id]"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="(auth)/login" options={{ presentation: 'modal' }} />
        <Stack.Screen name="(auth)/register" options={{ presentation: 'modal' }} />
        <Stack.Screen name="chat/[matchId]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="services/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="services/request" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="owner/dashboard" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="owner/publish" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="owner/boost" options={{ presentation: 'modal' }} />
        <Stack.Screen name="owner/billing" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
  },
});
