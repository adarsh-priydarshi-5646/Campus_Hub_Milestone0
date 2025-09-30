import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SemesterDetailsScreen from '../screens/SemesterDetailsScreen';
import FacultyScreen from '../screens/FacultyScreen';
import FacultyDetailScreen from '../screens/FacultyDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import MessDetailsScreen from '../screens/MessDetailsScreen';
import CollegeDetailsScreen from '../screens/CollegeDetailsScreen';
import SubjectRoadmapScreen from '../screens/SubjectRoadmapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, typography, spacing } from '../styles/globalStyles';
import { useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (__DEV__) {
    console.log('AppNavigator: user =', user ? `${user.name} (${user.email})` : 'null');
    console.log('AppNavigator: loading =', loading);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ ...typography.body, color: colors.text.secondary, marginTop: spacing.md }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (__DEV__) {
    console.log('AppNavigator: Rendering', user ? 'AUTHENTICATED' : 'UNAUTHENTICATED', 'screens');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen}
              options={{
                gestureEnabled: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen 
              name="SemesterDetails" 
              component={SemesterDetailsScreen}
              options={({ route }) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
                headerTitle: route.params?.semesterName || 'Semester Details',
                headerBackTitleVisible: false,
              })}
            />
            <Stack.Screen 
              name="Faculty" 
              component={FacultyScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="FacultyDetail"
              component={FacultyDetailScreen}
              options={({ route }) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
                headerTitle: 'Faculty Details',
                headerBackTitleVisible: false,
              })}
            />
            <Stack.Screen 
              name="Events" 
              component={EventsScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="MessDetails"
              component={MessDetailsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
                headerTitle: 'Mess Menu',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="CollegeDetails"
              component={CollegeDetailsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
                headerTitle: 'College Information',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="SubjectRoadmap"
              component={SubjectRoadmapScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
                headerTitle: 'Subject Roadmap',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
