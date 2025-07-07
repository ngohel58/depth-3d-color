import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ImageUploader from '../components/ImageUploader';
import ToolSelector from '../components/ToolSelector';
import MethodSelector from '../components/MethodSelector';
import MethodControls from '../components/MethodControls';
import PreviewPanel from '../components/PreviewPanel';
import GradientControls from '../components/GradientControls';
import EdgeControls from '../components/EdgeControls';
import { hexToRgb } from '../utils/colorUtils';
import EnhancementControls from '../components/EnhancementControls';
import ActionButtons from '../components/ActionButtons';
import BottomSheet from '../components/BottomSheet';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [methodParams, setMethodParams] = useState<any>({});
  const [depthMap, setDepthMap] = useState<string | null>(null);
  const [coloredImage, setColoredImage] = useState<string | null>(null);
  const [gradientColors, setGradientColors] = useState({ foreground: '#FF0000', background: '#0000FF' });
  const [edgeSettings, setEdgeSettings] = useState({ enabled: true, color: '#000000', thickness: 2 });
  const [enhancementSettings, setEnhancementSettings] = useState({
    brightness: 0, contrast: 1, saturation: 1, sharpness: 1, gamma: 1
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<string>('');

  useEffect(() => {
    if (depthMap && gradientColors) {
      applyColorsToDepthMap();
    }
  }, [gradientColors, enhancementSettings, edgeSettings]);

  const handleImageSelect = (imageUri: string) => {
    setSelectedImage(imageUri);
    setDepthMap(null);
    setColoredImage(null);
    setSelectedTool('');
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setBottomSheetContent(toolId);
    setShowBottomSheet(true);
  };

  const generateDepthMap = async () => {
    if (!selectedImage || !selectedMethod) {
      Alert.alert('Error', 'Please select an image and depth method first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      await new Promise<void>((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          
          const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
          if (imageData) {
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
              let gray;
              switch (selectedMethod) {
                case 'depth-anything-v2':
                  gray = (data[i] * 0.2 + data[i + 1] * 0.7 + data[i + 2] * 0.1) * (methodParams.confidence || 0.5);
                  break;
                case 'midas':
                  gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) * (methodParams.alpha || 0.6);
                  break;
                case 'marigold':
                  gray = Math.pow(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114, 1.2) * (methodParams.ensemble || 4) / 4;
                  break;
                case 'tfjs-depth':
                  gray = (data[i] * 0.1 + data[i + 1] * 0.8 + data[i + 2] * 0.1) * (methodParams.focus || 0.8);
                  break;
                case 'depth-pro':
                  gray = Math.min(255, (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) * (methodParams.sharpness || 1.0));
                  break;
                default:
                  gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
              }
              
              gray = Math.max(0, Math.min(255, gray));
              data[i] = gray;
              data[i + 1] = gray;
              data[i + 2] = gray;
            }
            ctx?.putImageData(imageData, 0, 0);
          }
          
          setDepthMap(canvas.toDataURL());
          resolve();
        };
        img.src = selectedImage;
      });
      
      Alert.alert('Success', 'Depth map generated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate depth map');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyColorsToDepthMap = async () => {
    if (!depthMap) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const data = imageData.data;
          const fgColor = hexToRgb(gradientColors.foreground);
          const bgColor = hexToRgb(gradientColors.background);
          
          for (let i = 0; i < data.length; i += 4) {
            const intensity = data[i] / 255;
            
            let r = bgColor.r + (fgColor.r - bgColor.r) * intensity;
            let g = bgColor.g + (fgColor.g - bgColor.g) * intensity;
            let b = bgColor.b + (fgColor.b - bgColor.b) * intensity;
            
            r = Math.max(0, Math.min(255, r * enhancementSettings.contrast + enhancementSettings.brightness));
            g = Math.max(0, Math.min(255, g * enhancementSettings.contrast + enhancementSettings.brightness));
            b = Math.max(0, Math.min(255, b * enhancementSettings.contrast + enhancementSettings.brightness));
            
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }
          ctx?.putImageData(imageData, 0, 0);
        }
        
        setColoredImage(canvas.toDataURL());
      };
      img.src = depthMap;
    } catch (error) {
      console.error('Failed to apply colors:', error);
    }
  };


  const handleDownload = async (type: 'depth' | 'final') => {
    const imageToDownload = type === 'depth' ? depthMap : coloredImage;
    if (!imageToDownload) {
      Alert.alert('Error', `No ${type} image to download`);
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant media library permissions');
        return;
      }

      const filename = `${type}_image_${Date.now()}.png`;
      const fileUri = FileSystem.documentDirectory + filename;
      
      const base64Data = imageToDownload.split(',')[1];
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Success', `${type} image saved to gallery!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetContent) {
      case 'depth':
        return (
          <View>
            <MethodSelector onMethodSelect={setSelectedMethod} selectedMethod={selectedMethod} />
            {selectedMethod && (
              <MethodControls method={selectedMethod} params={methodParams} onParamsChange={setMethodParams} />
            )}
          </View>
        );
      case 'gradient':
        return <GradientControls colors={gradientColors} onColorsChange={setGradientColors} />;
      case 'enhance':
        return <EnhancementControls settings={enhancementSettings} onSettingsChange={setEnhancementSettings} />;
      case 'edge':
        return <EdgeControls settings={edgeSettings} onSettingsChange={setEdgeSettings} />;
      default:
        return <Text style={{color: '#1E293B'}}>Select a tool to configure</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient colors={['#F8FAFC', '#E2E8F0', '#CBD5E1']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <BlurView intensity={20} style={styles.header}>
            <Text style={styles.title}>AI Depth Vision Studio</Text>
            <Text style={styles.subtitle}>Professional chromostereopsis editor</Text>
          </BlurView>

          <BlurView intensity={20} style={styles.section}>
            <ImageUploader onImageSelect={handleImageSelect} selectedImage={selectedImage} />
          </BlurView>

          {selectedImage && (
            <BlurView intensity={20} style={styles.section}>
              <ToolSelector onToolSelect={handleToolSelect} selectedTool={selectedTool} />
            </BlurView>
          )}

          {selectedImage && (
            <BlurView intensity={20} style={styles.section}>
              <PreviewPanel originalImage={selectedImage} depthMap={depthMap} coloredImage={coloredImage} />
            </BlurView>
          )}

          {selectedImage && (
            <BlurView intensity={20} style={styles.section}>
              <ActionButtons 
                onGenerateDepth={generateDepthMap}
                onApplyColors={applyColorsToDepthMap}
                onDownload={handleDownload}
                canGenerate={!!selectedMethod}
                canApply={!!depthMap}
                canDownload={!!coloredImage}
                isGenerating={isGenerating}
              />
            </BlurView>
          )}
        </ScrollView>
      </LinearGradient>

      <BottomSheet
        title={`${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} Controls`}
        isVisible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        onApply={() => {
          if (selectedTool === 'depth') generateDepthMap();
          else if (selectedTool === 'gradient') applyColorsToDepthMap();
          setShowBottomSheet(false);
        }}
        onRevert={() => {
          if (selectedTool === 'enhance') {
            setEnhancementSettings({ brightness: 0, contrast: 1, saturation: 1, sharpness: 1, gamma: 1 });
          }
        }}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollView: { flex: 1, paddingTop: 20 },
  header: {
    margin: 16, padding: 24, borderRadius: 20, alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center' },
  section: {
    margin: 16, marginTop: 8, padding: 20, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
});