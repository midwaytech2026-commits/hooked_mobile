import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Match } from '../../screens/Matches/mockMatches';
import { OnlineIndicator } from './OnlineIndicator';

const CARD_WIDTH = 110;
const CARD_HEIGHT = 146;

interface MatchCardProps {
  match: Match;
  onPress: () => void;
}

export function MatchCard({ match, onPress }: MatchCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${match.name}, ${match.age}`}
    >
      {/* Photo / placeholder */}
      <View style={[styles.card, { backgroundColor: match.placeholderBg }]}>
        <View style={[styles.glow, { backgroundColor: match.placeholderAccent }]} />

        {/* Silhouette */}
        <View style={styles.silhouetteHead} />
        <View style={styles.silhouetteBody} />

        {/* Bottom scrim + name */}
        <View style={styles.scrim}>
          <Text style={styles.name} numberOfLines={1}>{match.name}</Text>
        </View>

        {/* Online indicator */}
        {match.online && (
          <View style={styles.onlineDot}>
            <OnlineIndicator size={12} borderColor={match.placeholderBg} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: CARD_WIDTH,
  },
  pressed: { opacity: 0.8 },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  glow: {
    ...StyleSheet.absoluteFillObject,
  },

  silhouetteHead: {
    position: 'absolute',
    top: CARD_HEIGHT * 0.16,
    alignSelf: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  silhouetteBody: {
    position: 'absolute',
    top: CARD_HEIGHT * 0.42,
    alignSelf: 'center',
    width: 60,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  scrim: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 20,
    background: 'transparent',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  onlineDot: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
