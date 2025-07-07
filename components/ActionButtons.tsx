import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ActionButtonsProps {
  onGenerateDepth: () => void;
  onApplyColors: () => void;
  onDownload: (type: 'depth' | 'final') => void;
  canGenerate: boolean;
  canApply: boolean;
  canDownload: boolean;
  isGenerating: boolean;
}

export default function ActionButtons({
  onGenerateDepth,
  onApplyColors,
  onDownload,
  canGenerate,
  canApply,
  canDownload,
  isGenerating
}: ActionButtonsProps) {
  const Button = ({ title, onPress, disabled, primary = false, loading = false }: {
    title: string;
    onPress: () => void;
    disabled: boolean;
    primary?: boolean;
    loading?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        primary && styles.primaryButton,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Actions</Text>
      
      <View style={styles.buttonRow}>
        <Button
          title="Generate Depth"
          onPress={onGenerateDepth}
          disabled={!canGenerate}
          primary
          loading={isGenerating}
        />
        <Button
          title="Apply Colors"
          onPress={onApplyColors}
          disabled={!canApply}
        />
      </View>
      
      <View style={styles.buttonRow}>
        <Button
          title="Download Depth"
          onPress={() => onDownload('depth')}
          disabled={!canDownload}
        />
        <Button
          title="Download Final"
          onPress={() => onDownload('final')}
          disabled={!canDownload}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: 'rgba(59,130,246,0.3)',
    borderColor: '#3B82F6',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: 'rgba(255,255,255,0.5)',
  },
});