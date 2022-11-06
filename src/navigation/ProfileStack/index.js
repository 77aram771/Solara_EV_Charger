import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ProfileScreen } from "../../screens/ProfileScreen"
import { SettingsScreen } from "../../screens/ProfileScreen/SettingsScreen"
import { LangScreen } from "../../screens/ProfileScreen/LangScreen"
import { horizontalAnimation } from "../../shared/MockData"
import { AppInfoScreen } from "../../screens/ProfileScreen/AppInfoScreen"
import { PartnerScreen } from "../../screens/ProfileScreen/PartnerScreen"
import { FAQScreen } from "../../screens/ProfileScreen/FAQScreen"
import { NotificationScreen } from "../../screens/ProfileScreen/NotificationScreen"
import { AskQuestionScreen } from "../../screens/ProfileScreen/AskQuestionScreen"
import { SignInScreen } from "../../screens/ProfileScreen/SignInScreen"
import { ForgotPasswordScreen } from "../../screens/ProfileScreen/ForgotPasswordScreen"
import { SignUpScreen } from "../../screens/ProfileScreen/SignUpScreen"
import { PersonalInformationScreen } from "../../screens/ProfileScreen/PersonalInformationScreen"
import { ChangePasswordScreen } from "../../screens/ProfileScreen/ChangePasswordScreen"
import { HistoryScreen } from "../../screens/ProfileScreen/HistoryScreen"
import { ConfirmCodeScreen } from "../../screens/ProfileScreen/ConfirmCodeScreen"

export const ProfileStack = () => {

  const Profile = createStackNavigator()

  return (
    <Profile.Navigator
      initialRouteName="Profile"
      screenOptions={horizontalAnimation}
    >
      <Profile.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="Lang"
        component={LangScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="AppInfo"
        component={AppInfoScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="Partner"
        component={PartnerScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="AskQuestion"
        component={AskQuestionScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Profile.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="ConfirmCode"
        component={ConfirmCodeScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Profile.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </Profile.Navigator>
  )
}
