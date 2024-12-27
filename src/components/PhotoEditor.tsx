"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Download, Sliders } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CurveEditor } from './ui/curve-editor';

interface FilterPreset {
  colorAdjustments: string;
  grainAmount: number;
  grainSize: number;
}

interface ManualAdjustments {
  // Basic adjustments
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
  grain: number;
  
  // Lift/Gamma/Gain
  shadows: number;
  midtones: number;
  highlights: number;
  
  // HSL
  hue: number;
  saturationHSL: number;
  luminance: number;
  
  // RGB Curves (control points)
  redCurve: { x: number; y: number }[];
  greenCurve: { x: number; y: number }[];
  blueCurve: { x: number; y: number }[];
  rgbCurve: { x: number; y: number }[];
}

export default function PhotoEditor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('original');
  const [filterIntensity, setFilterIntensity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [manualAdjustments, setManualAdjustments] = useState<ManualAdjustments>({
    // Basic adjustments
    brightness: 1,
    contrast: 1,
    saturation: 1,
    temperature: 0,
    grain: 0,
    
    // Lift/Gamma/Gain
    shadows: 1,
    midtones: 1,
    highlights: 1,
    
    // HSL
    hue: 0,
    saturationHSL: 1,
    luminance: 1,
    
    // RGB Curves (default to linear)
    redCurve: [
      { x: 0, y: 0 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1 }
    ],
    greenCurve: [
      { x: 0, y: 0 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1 }
    ],
    blueCurve: [
      { x: 0, y: 0 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1 }
    ],
    rgbCurve: [
      { x: 0, y: 0 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1 }
    ]
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const filmPresets: { [key: string]: FilterPreset } = {
    original: {
      colorAdjustments: '',
      grainAmount: 0,
      grainSize: 0
    },
    portra400: {
      colorAdjustments: 'brightness(1.1) contrast(1.1) saturate(0.9) sepia(0.1)',
      grainAmount: 0.2,
      grainSize: 1.5
    },
    kodachrome: {
      colorAdjustments: 'brightness(1.2) contrast(1.5) saturate(1.4) sepia(0.15) hue-rotate(-5deg)',
      grainAmount: 0.15,
      grainSize: 1.2
    },
    trix400: {
      colorAdjustments: 'brightness(1.1) contrast(1.5) saturate(0) sepia(0.1)',
      grainAmount: 0.4,
      grainSize: 2
    },
    fujipro400h: {
      colorAdjustments: 'brightness(1.05) contrast(1.1) saturate(1.2) sepia(0.1) hue-rotate(5deg)',
      grainAmount: 0.25,
      grainSize: 1.8
    },
    cinestill800t: {
      colorAdjustments: 'brightness(1.1) contrast(1.2) saturate(0.8) sepia(0.15) hue-rotate(15deg)',
      grainAmount: 0.35,
      grainSize: 2.2
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            resolve(e.target.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      setSelectedImage(imageUrl);
      setFilter('original');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const interpolateFilterValue = (start: number, end: number, intensity: number) => {
    return start + (end - start) * intensity;
  };

  const applyGrain = (ctx: CanvasRenderingContext2D, width: number, height: number, amount: number, size: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    const randomFactor = 1 + (Math.random() * 0.2 - 0.1);
    const adjustedAmount = amount * randomFactor * filterIntensity;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const localSize = size * (1 + (Math.random() * 0.2 - 0.1));
      const grainValue = (Math.random() - 0.5) * adjustedAmount * 255 * localSize;
      
      pixels[i] += grainValue;
      pixels[i + 1] += grainValue;
      pixels[i + 2] += grainValue;
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const applyManualAdjustments = (ctx: CanvasRenderingContext2D) => {
    // Apply basic adjustments
    ctx.filter = `brightness(${manualAdjustments.brightness}) 
                 contrast(${manualAdjustments.contrast}) 
                 saturate(${manualAdjustments.saturation})
                 hue-rotate(${manualAdjustments.temperature}deg)`;
                 
    // Draw the image with basic adjustments
    if (!imageRef.current) return;
    ctx.drawImage(imageRef.current, 0, 0);
    
    // Get image data for pixel manipulation
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    
    // Apply Lift/Gamma/Gain
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      
      // Apply shadows (lift)
      const shadowsEffect = (x: number) => Math.max(0, Math.min(1, x * manualAdjustments.shadows));
      // Apply midtones (gamma)
      const midtonesEffect = (x: number) => Math.pow(x, 1 / manualAdjustments.midtones);
      // Apply highlights (gain)
      const highlightsEffect = (x: number) => Math.max(0, Math.min(1, x * manualAdjustments.highlights));
      
      // Apply RGB curves
      const applyCurve = (value: number, curve: { x: number; y: number }[]) => {
        // Find the segment where the value falls
        for (let j = 0; j < curve.length - 1; j++) {
          if (value >= curve[j].x && value <= curve[j + 1].x) {
            const t = (value - curve[j].x) / (curve[j + 1].x - curve[j].x);
            return curve[j].y + t * (curve[j + 1].y - curve[j].y);
          }
        }
        return value;
      };
      
      // Apply curves to each channel
      const rCurve = applyCurve(r, manualAdjustments.redCurve);
      const gCurve = applyCurve(g, manualAdjustments.greenCurve);
      const bCurve = applyCurve(b, manualAdjustments.blueCurve);
      const rgbCurve = applyCurve((r + g + b) / 3, manualAdjustments.rgbCurve);
      
      // Convert RGB to HSL
      const [h, s, l] = rgbToHsl(rCurve, gCurve, bCurve);
      
      // Apply HSL adjustments
      const newHue = (h + manualAdjustments.hue) % 360;
      const newSat = s * manualAdjustments.saturationHSL;
      const newLum = l * manualAdjustments.luminance;
      
      // Convert back to RGB
      const [newR, newG, newB] = hslToRgb(newHue, newSat, newLum);
      
      // Apply all effects in sequence
      data[i] = Math.round(highlightsEffect(midtonesEffect(shadowsEffect(newR))) * 255);
      data[i + 1] = Math.round(highlightsEffect(midtonesEffect(shadowsEffect(newG))) * 255);
      data[i + 2] = Math.round(highlightsEffect(midtonesEffect(shadowsEffect(newB))) * 255);
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  // Helper functions for color conversion
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h *= 60;
    }

    return [h, s, l];
  };

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, (h / 360 + 1/3));
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, (h / 360 - 1/3));
    }

    return [r, g, b];
  };

  const applyFilter = async (filterName: string) => {
    setFilter(filterName);
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;

    if (filterName === 'manual') {
      applyManualAdjustments(ctx);
      if (manualAdjustments.grain > 0) {
        ctx.filter = 'none';
        applyGrain(ctx, canvas.width, canvas.height, manualAdjustments.grain, 1.5);
      }
    } else {
      ctx.filter = filmPresets[filterName].colorAdjustments;
      ctx.drawImage(imageRef.current, 0, 0);
      
      if (filterName !== 'original') {
        ctx.filter = 'none';
        applyGrain(
          ctx,
          canvas.width,
          canvas.height,
          filmPresets[filterName].grainAmount,
          filmPresets[filterName].grainSize
        );
      }
    }
  };

  const clearFilter = () => {
    setFilter('original');
    applyFilter('original');
  };

  const resetImage = () => {
    setSelectedImage(null);
    setFilter('original');
    setIsLoading(false);
  };

  const exportImage = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-photo-${filter}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);
  };

  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        imageRef.current = img;
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.filter = 'none';
            ctx.drawImage(img, 0, 0);
            if (filter !== 'original') {
              applyFilter(filter);
            }
          }
        }
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage && filter && imageRef.current) {
      applyFilter(filter);
    }
  }, [filter, filterIntensity, manualAdjustments]);

  const handleManualAdjustment = (type: keyof ManualAdjustments, value: number | { x: number; y: number }[]) => {
    setManualAdjustments(prev => ({ ...prev, [type]: value }));
    if (filter !== 'manual') {
      setFilter('manual');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 bg-black/50 backdrop-blur-xl border-[#222]">
      <CardHeader className="bg-black/50">
        <CardTitle className="text-2xl font-bold text-white">REALFILM editor by Mudit</CardTitle>
        <CardDescription className="text-gray-400">
          Upload a photo and apply classic film looks with authentic grain each time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-black/50">
        {!selectedImage ? (
          <div className="border-2 border-dashed border-[#222] rounded-lg p-12 text-center bg-black/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-600 mb-4" />
              <span className="text-gray-500">Click to upload an image</span>
            </label>
          </div>
        ) : (
          <div className="space-y-4 bg-black/50">
            <Tabs defaultValue="presets" className="w-full">
              <TabsList className="bg-[#111] border-[#222]">
                <TabsTrigger value="presets" className="text-white">Film Presets</TabsTrigger>
                <TabsTrigger value="manual" className="text-white">Manual Adjust</TabsTrigger>
              </TabsList>
              <TabsContent value="presets" className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filmPresets).map(([presetName, _]) => (
                    <Button
                      key={presetName}
                      variant="outline"
                      className={`bg-[#111] text-white border-[#222] hover:bg-[#181818] ${
                        filter === presetName ? 'ring-2 ring-white' : ''
                      }`}
                      onClick={() => applyFilter(presetName)}
                      disabled={isLoading}
                    >
                      {presetName.charAt(0).toUpperCase() + presetName.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Button>
                  ))}
                </div>
                {filter !== 'original' && filter !== 'manual' && (
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Filter Intensity</label>
                    <Slider
                      value={[filterIntensity]}
                      min={0}
                      max={1}
                      step={0.1}
                      onValueChange={([value]) => setFilterIntensity(value)}
                      className="w-full"
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Brightness</label>
                    <Slider
                      value={[manualAdjustments.brightness]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('brightness', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Contrast</label>
                    <Slider
                      value={[manualAdjustments.contrast]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('contrast', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Saturation</label>
                    <Slider
                      value={[manualAdjustments.saturation]}
                      min={0}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('saturation', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Temperature</label>
                    <Slider
                      value={[manualAdjustments.temperature]}
                      min={-30}
                      max={30}
                      step={1}
                      onValueChange={([value]) => handleManualAdjustment('temperature', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Grain</label>
                    <Slider
                      value={[manualAdjustments.grain]}
                      min={0}
                      max={0.5}
                      step={0.05}
                      onValueChange={([value]) => handleManualAdjustment('grain', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Shadows (Lift)</label>
                    <Slider
                      value={[manualAdjustments.shadows]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('shadows', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Midtones (Gamma)</label>
                    <Slider
                      value={[manualAdjustments.midtones]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('midtones', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Highlights (Gain)</label>
                    <Slider
                      value={[manualAdjustments.highlights]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('highlights', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Hue</label>
                    <Slider
                      value={[manualAdjustments.hue]}
                      min={-180}
                      max={180}
                      step={1}
                      onValueChange={([value]) => handleManualAdjustment('hue', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Saturation (HSL)</label>
                    <Slider
                      value={[manualAdjustments.saturationHSL]}
                      min={0}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('saturationHSL', value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Luminance</label>
                    <Slider
                      value={[manualAdjustments.luminance]}
                      min={0}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => handleManualAdjustment('luminance', value)}
                    />
                  </div>
                  <div className="space-y-4 border border-[#222] rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white">Curves</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">RGB</label>
                      <CurveEditor
                        points={manualAdjustments.rgbCurve}
                        onChange={(points) => handleManualAdjustment('rgbCurve', points)}
                        color="#FFFFFF"
                        width={200}
                        height={200}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Red Channel</label>
                      <CurveEditor
                        points={manualAdjustments.redCurve}
                        onChange={(points) => handleManualAdjustment('redCurve', points)}
                        color="#FF4444"
                        lineColor="#FF4444"
                        width={200}
                        height={200}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Green Channel</label>
                      <CurveEditor
                        points={manualAdjustments.greenCurve}
                        onChange={(points) => handleManualAdjustment('greenCurve', points)}
                        color="#44FF44"
                        lineColor="#44FF44"
                        width={200}
                        height={200}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Blue Channel</label>
                      <CurveEditor
                        points={manualAdjustments.blueCurve}
                        onChange={(points) => handleManualAdjustment('blueCurve', points)}
                        color="#4444FF"
                        lineColor="#4444FF"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="relative bg-black/50 rounded-lg overflow-hidden border border-[#222]" style={{ minHeight: '400px' }}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-gray-400">Loading image...</div>
                </div>
              ) : (
                <>
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="Preview"
                    className="hidden"
                    onError={() => {
                      console.error('Error loading image');
                      setIsLoading(false);
                      setSelectedImage(null);
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain bg-black/50"
                  />
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-orange-700 text-white border-orange-900 hover:bg-orange-800"
                onClick={clearFilter}
                disabled={isLoading}
              >
                Clear Filter
              </Button>
              <Button
                variant="outline"
                className="bg-green-700 text-white border-green-900 hover:bg-green-800"
                onClick={exportImage}
                disabled={isLoading}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                className="bg-red-700 text-white border-red-900 hover:bg-red-800"
                onClick={resetImage}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
