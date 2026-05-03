import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Spacing } from '../../styles/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLS = 3;
const GAP = 8;
const CELL_SIZE = Math.floor(
  (SCREEN_WIDTH - Spacing.lg * 2 - GAP * (COLS - 1)) / COLS,
);

const GALLERY_PLACEHOLDERS = [
  { id: 'g1', bg: '#1A0828', accent: 'rgba(233,30,140,0.35)' },
  { id: 'g2', bg: '#0D1A28', accent: 'rgba(99,102,241,0.35)' },
  { id: 'g3', bg: '#120D1A', accent: 'rgba(168,85,247,0.35)' },
  { id: 'g4', bg: '#0D1A1A', accent: 'rgba(20,184,166,0.35)' },
  { id: 'g5', bg: '#1A1A0D', accent: 'rgba(245,158,11,0.35)' },
  { id: 'g6', bg: '#1A0D0D', accent: 'rgba(239,68,68,0.25)' },
];

interface GalleryGridProps {
  onImagePress?: (index: number) => void;
}

export function GalleryGrid({ onImagePress }: GalleryGridProps): React.JSX.Element {
  const rows: (typeof GALLERY_PLACEHOLDERS)[] = [];
  for (let i = 0; i < GALLERY_PLACEHOLDERS.length; i += COLS) {
    rows.push(GALLERY_PLACEHOLDERS.slice(i, i + COLS));
  }

  return (
    <View style={styles.grid}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, colIndex) => {
            const globalIndex = rowIndex * COLS + colIndex;
            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
                onPress={() => onImagePress?.(globalIndex)}
                accessibilityRole="imagebutton"
                accessibilityLabel={`Gallery photo ${globalIndex + 1}`}
              >
                <View style={[styles.placeholder, { backgroundColor: item.bg }]}>
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: item.accent },
                    ]}
                  />
                  {/* silhouette */}
                  <View style={styles.silHead} />
                  <View style={styles.silBody} />
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  silHead: {
    position: 'absolute',
    top: CELL_SIZE * 0.18,
    alignSelf: 'center',
    width: CELL_SIZE * 0.26,
    height: CELL_SIZE * 0.26,
    borderRadius: CELL_SIZE * 0.13,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  silBody: {
    position: 'absolute',
    bottom: -CELL_SIZE * 0.06,
    alignSelf: 'center',
    width: CELL_SIZE * 0.55,
    height: CELL_SIZE * 0.42,
    borderRadius: CELL_SIZE * 0.25,
    backgroundColor: 'rgba(255,255,255,0.11)',
  },
});
