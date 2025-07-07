import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ColorPicker from './ColorPicker';
import CustomSlider from './CustomSlider';

interface GradientControlsProps {
  colors: { foreground: string; background: string };
  onColorsChange: (colors: { foreground: string; background: string }) => void;
}

export default function GradientControls({ colors, onColorsChange }: GradientControlsProps) {
  const [mode, setMode] = useState<'simple' | 'layers' | 'advanced'>('simple');
  const [layerCount, setLayerCount] = useState(3);
  const [layerColors, setLayerColors] = useState(['#FF0000', '#FFFF00', '#0000FF']);
  const [hueShift, setHueShift] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [brightness, setBrightness] = useState(0);

  const updateColor = (type: 'foreground' | 'background', color: string) => {
    onColorsChange({ ...colors, [type]: color });
  };

  const updateLayerColor = (index: number, color: string) => {
    const newColors = [...layerColors];
    newColors[index] = color;
    setLayerColors(newColors);
  };

  const invertGradient = () => {
    onColorsChange({
      foreground: colors.background,
      background: colors.foreground
    });
  };

  const randomizeColors = () => {
    const getRandomColor = () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000', '#8000FF'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    onColorsChange({
      foreground: getRandomColor(),
      background: getRandomColor()
    });
  };

  const ModeButton = ({ title, value, emoji }: { title: string; value: string; emoji: string }) => (
    <TouchableOpacity
      style={[styles.modeButton, mode === value && styles.modeButtonActive]}
      onPress={() => setMode(value as any)}
    >
      <Text style={styles.modeEmoji}>{emoji}</Text>
      <Text style={[styles.modeText, mode === value && styles.modeTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  const renderGradientPreview = () => {
    let gradientColors = [];
    
    switch (mode) {
      case 'simple':
        gradientColors = [colors.background, colors.foreground];
        break;
      case 'layers':
        gradientColors = layerColors.slice(0, layerCount);
        break;
      case 'advanced':
        gradientColors = [colors.background, colors.foreground];
        break;
    }
    
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientPreview}
      >
        <Text style={styles.gradientLabel}>Live Gradient Preview</Text>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 Gradient Controls</Text>
      
      {/* Mode Selection */}
      <View style={styles.modeSelector}>
        <ModeButton title="Simple" value="simple" emoji="🎯" />
        <ModeButton title="Layers" value="layers" emoji="🌈" />
        <ModeButton title="Advanced" value="advanced" emoji="🔬" />
      </View>

      {/* Gradient Preview */}
      {renderGradientPreview()}

      {/* Mode-specific Controls */}
      <ScrollView style={styles.controlsContainer} showsVerticalScrollIndicator={false}>
        {mode === 'simple' && (
          <View>
            <ColorPicker
              label="Foreground (Near)"
              color={colors.foreground}
              onColorChange={(color) => updateColor('foreground', color)}
            />
            <ColorPicker
              label="Background (Far)"
              color={colors.background}
              onColorChange={(color) => updateColor('background', color)}
            />
          </View>
        )}

        {mode === 'layers' && (
          <View>
            <CustomSlider
              label="Layer Count"
              value={layerCount}
              onValueChange={setLayerCount}
              minimumValue={2}
              maximumValue={6}
              step={1}
            />
            {Array.from({ length: layerCount }, (_, i) => (
              <ColorPicker
                key={i}
                label={`Layer ${i + 1}`}
                color={layerColors[i] || '#FFFFFF'}
                onColorChange={(color) => updateLayerColor(i, color)}
              />
            ))}
          </View>
        )}

        {mode === 'advanced' && (
          <View>
            <ColorPicker
              label="Foreground"
              color={colors.foreground}
              onColorChange={(color) => updateColor('foreground', color)}
            />
            <ColorPicker
              label="Background"
              color={colors.background}
              onColorChange={(color) => updateColor('background', color)}
            />
            <CustomSlider
              label="Hue Shift"
              value={hueShift}
              onValueChange={setHueShift}
              minimumValue={-180}
              maximumValue={180}
              step={5}
              unit="°"
            />
            <CustomSlider
              label="Saturation"
              value={saturation}
              onValueChange={setSaturation}
              minimumValue={-50}
              maximumValue={100}
              step={5}
              unit="%"
            />
            <CustomSlider
              label="Brightness"
              value={brightness}
              onValueChange={setBrightness}
              minimumValue={-50}
              maximumValue={100}
              step={5}
              unit="%"
            />
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={randomizeColors}>
          <Text style={styles.actionButtonText}>🎲 Random</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={invertGradient}>
          <Text style={styles.actionButtonText}>🔄 Invert</Text>
        </TouchableOpacity>
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
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  modeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: 'rgba(59,130,246,0.3)',
    borderColor: '#3B82F6',
  },
  modeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  modeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  modeTextActive: {
    color: '#FFFFFF',
  },
  gradientPreview: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controlsContainer: {
    width: '100%',
    maxHeight: 300,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});