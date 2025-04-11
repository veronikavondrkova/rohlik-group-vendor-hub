
import React from 'react';

interface FormatInfoProps {
  format?: string;
  width: number;
  height: number;
  supplier?: string;
  dateSubmitted?: string;
}

const FormatInfo = ({ format, width, height, supplier, dateSubmitted }: FormatInfoProps) => {
  return (
    <div className="text-center mt-4 text-sm text-gray-500">
      <p>
        {format && width && height && (
          <>
            {format} - {width} × {height}px (Shown at 50% scale)
            {supplier && <> | Supplier: {supplier}</>}
            {dateSubmitted && <> | Date Submitted: {dateSubmitted}</>}
          </>
        )}
      </p>
    </div>
  );
};

export default FormatInfo;
