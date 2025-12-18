import { useEffect } from 'react';
import { Theme } from '../types';

const DynamicFavicon = ({ theme }: { theme: Theme }) => {
  useEffect(() => {
    const updateFavicon = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = '/logo.png';
      img.crossOrigin = 'anonymous'; 

      img.onload = () => {
        // 1. Fill Background (Remove Transparency)
        // Dark Mode: Dark Slate Background
        // Light Mode: Light Paper Background
        ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#F5F5F0'; 
        ctx.fillRect(0, 0, 64, 64);

        // 2. Apply Grayscale Filter (Make logo gray)
        ctx.filter = 'grayscale(100%) contrast(1.2)'; // Added contrast to make it pop against the background
        
        // 3. Draw Image
        ctx.drawImage(img, 0, 0, 64, 64);

        // 4. Update Favicon Link
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');
      };
    };

    updateFavicon();
  }, [theme]);

  return null;
};

export default DynamicFavicon;
