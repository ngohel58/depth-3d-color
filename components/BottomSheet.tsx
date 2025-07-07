import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

interface BottomSheetProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  onApply?: () => void;
  onRevert?: () => void;
}

const { height } = Dimensions.get('window');

export default function BottomSheet({ title, children, isVisible, onClose, onApply, onRevert }: BottomSheetProps) {
  const [slideAnim] = useState(new Animated.Value(height));

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: height * 0.2,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: height,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
        <BlurView intensity={80} style={styles.content}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.scrollableBody}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            {children}
          </ScrollView>
          
          <View style={styles.footer}>
            {onRevert && (
              <TouchableOpacity style={styles.revertButton} onPress={onRevert}>
                <Text style={styles.revertText}>Revert</Text>
              </TouchableOpacity>
            )}
            {onApply && (
              <TouchableOpacity style={styles.applyButton} onPress={onApply}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            )}
          </View>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(203,213,225,0.3)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(148,163,184,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#64748B',
  },
  scrollableBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(203,213,225,0.3)',
    backgroundColor: 'rgba(255,255,255,0.98)',
  },
  revertButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    alignItems: 'center',
  },
  revertText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
  },
});