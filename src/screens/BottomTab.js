import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmployeeList from "./Main/EmployeeList";
import Profile from "./Main/Profile";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import EmployeeCreate from "./Main/EmployeeCreate";
import plus from "../../assets/plus.png";
import { useRef } from "react";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
        screenOptions={{
          tabBarActiveTintColor: "rgba(231,76,60,1)",
          showLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 30,
            marginHorizontal: 20,
            //Max Height
            height: 60,
            borderRadius: 10,
            // Shaddow
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}
      >
        <Tab.Screen
          name={"EmployeeList"}
          component={EmployeeList}
          options={{
            title: "Team Manager",
            headerStyle: {
              backgroundColor: "rgba(231,76,60,1)",
              // alignItems: 'center',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="home"
                  color={focused ? "rgba(231,76,60,1)" : "gray"}
                  size={20}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={"Recruter"}
          component={EmployeeCreate}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("EmployeeCreate")}
              >
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "rgba(231,76,60,1)",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: Platform.OS == "android" ? 50 : 30,
                  }}
                >
                  <Image
                    source={plus}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </TouchableOpacity>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"Profil"}
          component={Profile}
          options={{
            title: "Profil",
            headerStyle: {
              backgroundColor: "rgba(231,76,60,1)",
              // alignItems: 'center',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="user-alt"
                  color={focused ? "rgba(231,76,60,1)" : "gray"}
                  size={20}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "red",
          position: "absolute",
          bottom: 98,
          // Horizontal Padding = 20...
          left: 50,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total three Tabs...
  return width / 3;
}

export default BottomTabNavigator;
