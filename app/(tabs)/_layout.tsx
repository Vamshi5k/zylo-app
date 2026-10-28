import { Tabs } from "expo-router";
import { FloatingTabBar } from "../../src/components/layout/floating-tab-bar";
import { colors } from "../../theme";
import { tabs } from "../../src/constants/tabs";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
      ))}
    </Tabs>
  );
}
