import { useEffect } from 'react';
import { ring } from 'ldrs';

interface LoaderProps {
  size?: number | string;
  color?: string;
  stroke?: number | string;
}

export function Loader({ size = 40, color = '#4f46e5', stroke = 5 }: LoaderProps) {
  useEffect(() => {
    ring.register();
  }, []);

  return (
    <div className="flex justify-center items-center py-4">
      <l-ring
        size={size}
        stroke={stroke}
        bg-opacity="0"
        speed="2"
        color={color}
      ></l-ring>
    </div>
  );
}
