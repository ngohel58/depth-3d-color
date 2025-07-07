import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomSlider from './CustomSlider';

interface MethodControlsProps {
  method: string;
  params: any;
  onParamsChange: (params: any) => void;
}

export default function MethodControls({ method, params, onParamsChange }: MethodControlsProps) {
  const updateParam = (key: string, value: number) => {
    onParamsChange({ ...params, [key]: value });
  };

  const renderControls = () => {
    switch (method) {
      case 'depth-anything-v2':
        return (
          <View>
            <CustomSlider
              label="Processing Resolution"
              value={params.resolution || 768}
              onValueChange={(value) => updateParam('resolution', value)}
              minimumValue={384}
              maximumValue={1024}
              step={64}
              unit="px"
            />
            <CustomSlider
              label="Confidence Threshold"
              value={params.confidence || 0.5}
              onValueChange={(value) => updateParam('confidence', value)}
              minimumValue={0.1}
              maximumValue={1.0}
              step={0.1}
            />
            <CustomSlider
              label="Model Quality"
              value={params.quality || 1}
              onValueChange={(value) => updateParam('quality', value)}
              minimumValue={0}
              maximumValue={2}
              step={1}
            />
          </View>
        );
      case 'midas':
        return (
          <View>
            <CustomSlider
              label="Input Resolution"
              value={params.resolution || 384}
              onValueChange={(value) => updateParam('resolution', value)}
              minimumValue={256}
              maximumValue={768}
              step={64}
              unit="px"
            />
            <CustomSlider
              label="Alpha Value"
              value={params.alpha || 0.6}
              onValueChange={(value) => updateParam('alpha', value)}
              minimumValue={0.1}
              maximumValue={1.0}
              step={0.1}
            />
            <CustomSlider
              label="Depth Smoothing"
              value={params.smoothing || 0.5}
              onValueChange={(value) => updateParam('smoothing', value)}
              minimumValue={0.0}
              maximumValue={1.0}
              step={0.1}
            />
          </View>
        );
      case 'marigold':
        return (
          <View>
            <CustomSlider
              label="Denoising Steps"
              value={params.steps || 10}
              onValueChange={(value) => updateParam('steps', value)}
              minimumValue={4}
              maximumValue={50}
              step={2}
            />
            <CustomSlider
              label="Ensemble Size"
              value={params.ensemble || 4}
              onValueChange={(value) => updateParam('ensemble', value)}
              minimumValue={1}
              maximumValue={10}
              step={1}
            />
            <CustomSlider
              label="Processing Resolution"
              value={params.resolution || 768}
              onValueChange={(value) => updateParam('resolution', value)}
              minimumValue={512}
              maximumValue={1024}
              step={64}
              unit="px"
            />
          </View>
        );
      case 'tfjs-depth':
        return (
          <View>
            <CustomSlider
              label="Segmentation Quality"
              value={params.segmentation || 0.7}
              onValueChange={(value) => updateParam('segmentation', value)}
              minimumValue={0.3}
              maximumValue={1.0}
              step={0.1}
            />
            <CustomSlider
              label="Depth Smoothing"
              value={params.smoothing || 0.5}
              onValueChange={(value) => updateParam('smoothing', value)}
              minimumValue={0.1}
              maximumValue={1.0}
              step={0.1}
            />
            <CustomSlider
              label="Portrait Focus"
              value={params.focus || 0.8}
              onValueChange={(value) => updateParam('focus', value)}
              minimumValue={0.0}
              maximumValue={1.0}
              step={0.1}
            />
          </View>
        );
      case 'depth-pro':
        return (
          <View>
            <CustomSlider
              label="Boundary Sharpness"
              value={params.sharpness || 1.0}
              onValueChange={(value) => updateParam('sharpness', value)}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
            />
            <CustomSlider
              label="Metric Scale"
              value={params.scale || 1.0}
              onValueChange={(value) => updateParam('scale', value)}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
            />
            <CustomSlider
              label="Processing Quality"
              value={params.quality || 1}
              onValueChange={(value) => updateParam('quality', value)}
              minimumValue={0}
              maximumValue={2}
              step={1}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Method Parameters</Text>
      {renderControls()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
  },
});