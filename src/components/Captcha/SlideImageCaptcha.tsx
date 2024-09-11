"use client"
import { useState, useRef, useEffect } from "react";

const SlideImageCaptcha = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  
  const targetRef = useRef<HTMLDivElement>(null);
  const puzzleRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.MouseEvent) => {
    setIsDragging(false);

    if (puzzleRef.current && targetRef.current) {
      const puzzleRect = puzzleRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      
      const margin = 10; // margin of error for the match
      if (
        Math.abs(puzzleRect.left - targetRect.left) <= margin &&
        Math.abs(puzzleRect.top - targetRect.top) <= margin
      ) {
        setCaptchaValid(true);
      }
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragPosition({
        x: e.clientX - puzzleRef.current!.offsetWidth / 2,
        y: e.clientY - puzzleRef.current!.offsetHeight / 2,
      });
    }
  };

  return (
    <div className="captcha-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h3 className="font-bold text-lg">Slide the piece to complete the puzzle</h3>
      
      <div
        ref={targetRef}
        className="target"
        style={{
          backgroundImage: `url('/target-image.jpg')`,
          backgroundSize: 'cover',
          width: '200px',
          height: '200px',
          margin: '0 auto',
          border: '2px solid black',
          position: 'relative',
        }}
      >
        <div
          ref={puzzleRef}
          className="puzzle-piece"
          style={{
            backgroundImage: `url('/puzzle-piece.jpg')`,
            backgroundSize: 'cover',
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: dragPosition.y,
            left: dragPosition.x,
            cursor: 'move',
            transition: isDragging ? 'none' : 'all 0.3s ease',
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd} // in case the user drags out of bounds
        />
      </div>

      {captchaValid && (
        <p className="text-green-600 font-bold mt-4">Captcha Verified!</p>
      )}

      <button
        className="btn mt-4"
        disabled={!captchaValid}
        onClick={() => alert("Captcha Verified, Redirecting...")}
      >
        Continue
      </button>
    </div>
  );
};

export default SlideImageCaptcha;
