import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabName = 'discover' | 'likes' | 'spark' | 'chat' | 'profile';

const ACTIVE_GRADIENT: [string, string] = ['#FF4F8B', '#8B5CF6'];
const C_INACTIVE = '#8A8A98';

// ── Inline icon components ─────────────────────────────────────────────────────

function DiscoverIcon({ color }: { color: string }) {
  return (
    <View style={ic.wrap}>
      <View style={[ic.outerRing, { borderColor: color }]}>
        <View style={[ic.innerDot, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

function HeartIcon({ color }: { color: string }) {
  return (
    <View style={ic.wrap}>
      <Text style={[ic.symbol, { color }]}>♥</Text>
    </View>
  );
}

function SparkIcon({ color }: { color: string }) {
  return (
    <View style={ic.wrap}>
      <Text style={[ic.symbol, { color }]}>✦</Text>
    </View>
  );
}

function ChatIcon({ color }: { color: string }) {
  return (
    <View style={ic.chatWrap}>
      <View style={[ic.chatBody, { borderColor: color }]} />
      <View style={[ic.chatTail, { borderTopColor: color }]} />
    </View>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <View style={ic.wrap}>
      <View style={[ic.profileHead, { backgroundColor: color }]} />
      <View style={[ic.profileShoulder, { borderColor: color }]} />
    </View>
  );
}

// ── Tab config ─────────────────────────────────────────────────────────────────

const TABS: Array<{
  id: TabName;
  label: string;
  Icon: React.ComponentType<{ color: string }>;
}> = [
  { id: 'discover', label: 'Discover', Icon: DiscoverIcon },
  { id: 'likes',    label: 'Likes',    Icon: HeartIcon },
  { id: 'spark',    label: 'Spark',    Icon: SparkIcon },
  { id: 'chat',     label: 'Chat',     Icon: ChatIcon },
  { id: 'profile',  label: 'Profile',  Icon: ProfileIcon },
];

// ── Component ──────────────────────────────────────────────────────────────────

interface BottomTabBarProps {
  activeTab?: TabName;
  onTabPress?: (tab: TabName) => void;
}

export function BottomTabBar({
  activeTab = 'discover',
  onTabPress,
}: BottomTabBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.container}>
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === activeTab;
          return (
            <Pressable
              key={id}
              android_ripple={{ color: 'transparent' }}
              style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
              onPress={() => onTabPress?.(id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={label}
            >
              {isActive ? (
                <LinearGradient
                  colors={ACTIVE_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.activeWrap}
                >
                  <Icon color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveWrap}>
                  <Icon color={C_INACTIVE} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10,10,16,0.92)',
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPressed: { opacity: 0.7 },
  activeWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Icon sub-styles
const ic = StyleSheet.create({
  wrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 19,
    lineHeight: 22,
    includeFontPadding: false,
    textAlign: 'center',
  },
  // Discover: scope/target
  outerRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Chat bubble
  chatWrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  chatBody: {
    width: 20,
    height: 14,
    borderRadius: 5,
    borderWidth: 2,
  },
  chatTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  // Profile silhouette
  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 3,
  },
  profileShoulder: {
    width: 18,
    height: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderWidth: 2,
    borderBottomWidth: 0,
  },
});
