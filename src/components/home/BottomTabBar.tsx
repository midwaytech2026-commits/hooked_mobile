import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';

export type TabName = 'discover' | 'likes' | 'spark' | 'chat' | 'profile';

// Each tab can override the circle color shown when it is active.
const TAB_ACTIVE_BG: Record<TabName, string> = {
  discover: Colors.brand.purple,
  likes:    Colors.brand.pink,
  spark:    Colors.brand.pink,
  chat:     Colors.brand.pink,
  profile:  Colors.brand.purple,
};

const TABS: Array<{
  id: TabName;
  icon: string;
  /** Icon to show when this tab is active (optional — falls back to icon). */
  activeIcon?: string;
  label: string;
}> = [
  { id: 'discover', icon: '◉',             label: 'Discover' },
  { id: 'likes',    icon: '♡', activeIcon: '♥', label: 'Likes' },
  { id: 'spark',    icon: '✦',             label: 'Spark' },
  { id: 'chat',     icon: '◌',             label: 'Chat' },
  { id: 'profile',  icon: '⊙',             label: 'Profile' },
];

interface BottomTabBarProps {
  activeTab?: TabName;
  onTabPress?: (tab: TabName) => void;
}

export function BottomTabBar({
  activeTab = 'discover',
  onTabPress,
}: BottomTabBarProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = tab.id === activeTab;
        const displayIcon = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;
        return (
          <Pressable
            key={tab.id}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
            onPress={() => onTabPress?.(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View
              style={[
                styles.iconWrap,
                isActive && { backgroundColor: TAB_ACTIVE_BG[tab.id] },
              ]}
            >
              <Text style={[styles.icon, isActive && styles.iconActive]}>
                {displayIcon}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#111119',
    borderTopWidth: 1,
    borderTopColor: '#1E1E2E',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPressed: { opacity: 0.7 },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.35)',
    includeFontPadding: false,
  },
  iconActive: {
    color: '#FFFFFF',
  },
});
