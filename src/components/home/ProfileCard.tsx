import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../styles/colors';
import { ProfileChip } from './ProfileChip';
import type { Profile } from '../../screens/Home/mockProfiles';

// ── Constants ─────────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;
const SWIPE_OUT_DURATION = 240;

export const CARD_HEIGHT = Math.round(SCREEN_HEIGHT * 0.63);

// ── Imperative API ────────────────────────────────────────────────────────────
export interface ProfileCardRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface ProfileCardProps {
  profile: Profile;
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const ProfileCard = forwardRef<ProfileCardRef, ProfileCardProps>(
  ({ profile, onSwipedLeft, onSwipedRight }, ref) => {
    // Stable Animated value for the entire lifetime of this card instance.
    // The parent uses key={profile.id} so each profile gets a fresh mount.
    const position = useRef(new Animated.ValueXY()).current;

    // Keep latest callbacks accessible from the stale panResponder closure.
    const cbRef = useRef({ onSwipedLeft, onSwipedRight });
    cbRef.current = { onSwipedLeft, onSwipedRight };

    // ── Animation helpers ─────────────────────────────────────────────────────
    const swipeOut = (direction: 'left' | 'right', done: () => void) => {
      const toX =
        direction === 'right' ? SCREEN_WIDTH + 200 : -(SCREEN_WIDTH + 200);
      Animated.timing(position, {
        toValue: { x: toX, y: 20 },
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }).start(done);
    };

    const resetPosition = () => {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        friction: 6,
        tension: 50,
      }).start();
    };

    // Ref wrappers so the panResponder closure (created once) always calls the
    // latest versions of both helpers — avoids stale-closure bugs.
    const swipeOutRef = useRef(swipeOut);
    swipeOutRef.current = swipeOut;
    const resetPositionRef = useRef(resetPosition);
    resetPositionRef.current = resetPosition;

    // ── PanResponder ──────────────────────────────────────────────────────────
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            swipeOutRef.current('right', () => cbRef.current.onSwipedRight());
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            swipeOutRef.current('left', () => cbRef.current.onSwipedLeft());
          } else {
            resetPositionRef.current();
          }
        },
      }),
    ).current;

    // ── Imperative handle ─────────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      swipeLeft: () =>
        swipeOutRef.current('left', () => cbRef.current.onSwipedLeft()),
      swipeRight: () =>
        swipeOutRef.current('right', () => cbRef.current.onSwipedRight()),
    }));

    // ── Derived animated values ───────────────────────────────────────────────
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-9deg', '0deg', '9deg'],
      extrapolate: 'clamp',
    });

    // LIKE stamp fades in as the card moves right
    const likeOpacity = position.x.interpolate({
      inputRange: [0, SWIPE_THRESHOLD * 0.8],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    // NOPE stamp fades in as the card moves left
    const nopeOpacity = position.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD * 0.8, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const cardStyle = {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate },
      ],
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
      <Animated.View
        style={[styles.card, { height: CARD_HEIGHT }, cardStyle]}
        {...panResponder.panHandlers}
      >
        {profile.image != null ? (
          <ImageBackground
            source={profile.image}
            style={styles.fill}
            imageStyle={styles.imageRadius}
            resizeMode="cover"
          >
            <CardOverlays
              profile={profile}
              likeOpacity={likeOpacity}
              nopeOpacity={nopeOpacity}
            />
          </ImageBackground>
        ) : (
          <View
            style={[styles.fill, { backgroundColor: profile.placeholderBg }]}
          >
            {/* Simulated depth: ambient glow in the upper area */}
            <View
              style={[
                styles.placeholderGlow,
                { backgroundColor: profile.placeholderAccent },
              ]}
            />
            {/* Silhouette figure */}
            <View style={styles.silhouetteWrap}>
              <View style={styles.silhouetteHead} />
              <View style={styles.silhouetteBody} />
            </View>
            <CardOverlays
              profile={profile}
              likeOpacity={likeOpacity}
              nopeOpacity={nopeOpacity}
            />
          </View>
        )}
      </Animated.View>
    );
  },
);

// ── CardOverlays — top badges + LIKE/NOPE stamps + bottom info ────────────────
interface CardOverlaysProps {
  profile: Profile;
  likeOpacity: Animated.AnimatedInterpolation<number>;
  nopeOpacity: Animated.AnimatedInterpolation<number>;
}

function CardOverlays({
  profile,
  likeOpacity,
  nopeOpacity,
}: CardOverlaysProps): React.JSX.Element {
  return (
    <>
      {/* ── LIKE / NOPE stamps ──────────────────────────────── */}
      <Animated.View
        style={[styles.stamp, styles.stampLike, { opacity: likeOpacity }]}
        pointerEvents="none"
      >
        <Text style={styles.stampLikeText}>LIKE</Text>
      </Animated.View>
      <Animated.View
        style={[styles.stamp, styles.stampNope, { opacity: nopeOpacity }]}
        pointerEvents="none"
      >
        <Text style={styles.stampNopeText}>NOPE</Text>
      </Animated.View>

      {/* ── Top badges ──────────────────────────────────────── */}
      <View style={styles.topBadges}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>{profile.matchPercent}% MATCH</Text>
        </View>
        {profile.online && (
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineBadgeText}>Online now</Text>
          </View>
        )}
      </View>

      {/* ── Bottom overlay ──────────────────────────────────── */}
      {/* Scrim to make text legible over the card */}
      <View style={styles.scrim} pointerEvents="none" />

      <View style={styles.bottomInfo}>
        {/* Name · Age · Verified */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.age}> {profile.age}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedCheck}>✓</Text>
          </View>
        </View>

        {/* Distance · Job */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>📍 {profile.distance} km</Text>
          <Text style={styles.metaDot}> · </Text>
          <Text style={styles.metaText} numberOfLines={1}>
            {profile.job} · {profile.company}
          </Text>
        </View>

        {/* Interest chips */}
        <View style={styles.chips}>
          {profile.interests.slice(0, 4).map(interest => (
            <ProfileChip key={interest} label={interest} />
          ))}
        </View>
      </View>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1B1B27',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  fill: {
    flex: 1,
  },
  imageRadius: {
    borderRadius: 24,
  },

  // ── Placeholder ─────────────────────────────────────────
  placeholderGlow: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    borderRadius: SCREEN_WIDTH * 0.45,
  },
  silhouetteWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  silhouetteHead: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  silhouetteBody: {
    width: 160,
    height: 100,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  // ── LIKE / NOPE stamps ──────────────────────────────────
  stamp: {
    position: 'absolute',
    top: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 3,
    zIndex: 10,
  },
  stampLike: {
    left: 18,
    borderColor: '#2ECC71',
    transform: [{ rotate: '-15deg' }],
  },
  stampLikeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2ECC71',
    letterSpacing: 2,
  },
  stampNope: {
    right: 18,
    borderColor: '#E74C3C',
    transform: [{ rotate: '15deg' }],
  },
  stampNopeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#E74C3C',
    letterSpacing: 2,
  },

  // ── Top badges ──────────────────────────────────────────
  topBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  matchBadge: {
    backgroundColor: Colors.brand.pink,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
  },
  onlineBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Bottom scrim + info ─────────────────────────────────
  scrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.62)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    paddingBottom: 20,
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  age: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3D7EF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  verifiedCheck: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    includeFontPadding: false,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
    flexShrink: 1,
  },
  metaDot: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
});
