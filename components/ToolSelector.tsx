import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ToolSelectorProps {
  onToolSelect: (toolId: string) => void;
  selectedTool: string;
}

const tools: Tool[] = [
  { id: 'depth', name: 'Depth Map', icon: '🎯', description: 'Generate depth maps' },
  { id: 'gradient', name: 'Gradient', icon: '🌈', description: 'Apply color gradients' },
  { id: 'enhance', name: 'Enhance', icon: '✨', description: 'Image enhancements' },
  { id: 'edge', name: 'Edge Detection', icon: '🔍', description: 'Edge detection & separation' },
  { id: 'chromostereopsis', name: 'Chromostereopsis', icon: '👁️', description: 'Final depth effect' },
];

export default function ToolSelector({ onToolSelect, selectedTool }: ToolSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Tools</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[
              styles.toolItem,
              selectedTool === tool.id && styles.selectedTool
            ]}
            onPress={() => onToolSelect(tool.id)}
          >
            <BlurView 
              intensity={selectedTool === tool.id ? 100 : 60} 
              style={[
                styles.toolContent,
                selectedTool === tool.id && styles.selectedToolContent
              ]}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={[
                styles.toolName,
                selectedTool === tool.id && styles.selectedToolName
              ]}>
                {tool.name}
              </Text>
              <Text style={[
                styles.toolDescription,
                selectedTool === tool.id && styles.selectedToolDescription
              ]}>
                {tool.description}
              </Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  toolItem: {
    width: 130,
    height: 110,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedTool: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toolContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedToolContent: {
    backgroundColor: 'rgba(59,130,246,0.25)',
    borderColor: 'rgba(59,130,246,0.6)',
  },
  toolIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  toolName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 3,
  },
  selectedToolName: {
    color: '#1E40AF',
  },
  toolDescription: {
    fontSize: 10,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedToolDescription: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});