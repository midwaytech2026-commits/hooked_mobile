import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../styles/colors';
import type { LikedProfile } from '../../screens/Likes/mockLikedProfiles';

// ── Lock icon (geometric, no icon library) ────────────────────────────────────
function LockIcon(): React.JSX.Element {
  return (
    <View style={lockStyles.wrap}>
      <View style={lockStyles.shackle} />
      <View style={lockStyles.body}>
        <View style={lockStyles.keyhole} />
      </View>
    </View>
  );
}

const lockStyles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 2 },
  shackle: {
    width: 16,
    height: 10,
    borderWidth: 2.5,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  body: {
    width: 22,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyhole: {
    width: 5,
    height: 7,
    backgroundColor: '#E8A030',
    borderRadius: 2.5,
  },
});

// ── Props ─────────────────────────────────────────────────────────────────────
interface LikesProfileCardProps {
  profile: LikedProfile;
  cardWidth: number;
  cardHeight: number;
  onPress: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function LikesProfileCard({
  profile,
  cardWidth,
  cardHeight,
  onPress,
}: LikesProfileCardProps): React.JSX.Element {
  const cardStyle = { width: cardWidth, height: cardHeight };

  const inner = (
    <>
      {/* Ambient glow */}
      <View
        style={[
          styles.glow,
          { backgroundColor: profile.placeholderAccent },
        ]}
      />

      {profile.locked ? (
        /* ── Locked card ─────────────────────────────────────── */
        <View style={styles.lockOverlay}>
          <View style={styles.lockCircle}>
            <LockIcon />
          </View>
        </View>
      ) : (
        /* ── Visible card ────────────────────────────────────── */
        <>
          {/* Silhouette figure */}
          <View style={styles.silhouetteWrap}>
            <View style={styles.silhouetteHead} />
            <View style={styles.silhouetteBody} />
          </View>

          {/* Bottom scrim + info */}
          <View style={styles.scrim} pointerEvents="none" />
          <View style={styles.bottomInfo}>
            <Text style={styles.nameText}>
              {profile.name}, {profile.age}
            </Text>
            <Text style={styles.distanceText}>{profile.distance} km away</Text>
          </View>
        </>
      )}

      {/* NEW badge */}
      {profile.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
    </>
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        cardStyle,
        { backgroundColor: profile.placeholderBg },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        profile.locked
          ? 'Locked profile'
          : `${profile.name}, ${profile.age}, ${profile.distance} km away`
      }
    >
      {profile.image != null ? (
        <ImageBackground
          source={profile.image}
          style={styles.fill}
          imageStyle={styles.imageRadius}
          resizeMode="cover"
        >
          {inner}
        </ImageBackground>
      ) : (
        <View style={styles.fill}>{inner}</View>
      )}
    </Pressable>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fill: { flex: 1 },
  imageRadius: { borderRadius: 18 },

  // ── Glow
  glow: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
  },

  // ── Visible card
  silhouetteWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  silhouetteHead: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  silhouetteBody: {
    width: 90,
    height: 55,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  scrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    gap: 2,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  distanceText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },

  // ── Locked card
  lockOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8A030',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E8A030',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  // ── NEW badge
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.brand.pink,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
