import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
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
});
