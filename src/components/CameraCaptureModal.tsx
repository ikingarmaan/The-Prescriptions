import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (isOpen && !capturedPhoto) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async (mode: 'environment' | 'user') => {
    stopCamera();
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      // Fallback to default user camera if environment fails
      if (mode === 'environment') {
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(fallbackStream);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
          return;
        } catch (e: any) {
          setCameraError(e.message || 'Unable to access camera. Please allow camera permissions or upload an image file.');
        }
      } else {
        setCameraError(err.message || 'Camera permission denied or camera not available.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedPhoto(dataUrl);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera(facingMode);
  };

  const handleConfirm = () => {
    if (capturedPhoto) {
      onCapture(capturedPhoto);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div
      id="camera-modal-overlay"
      className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-black sm:bg-slate-900/80 sm:backdrop-blur-xs sm:p-4"
    >
      <div
        id="camera-modal-container"
        className="bg-slate-950 sm:bg-white w-full sm:rounded-2xl sm:shadow-2xl sm:max-w-2xl overflow-hidden sm:border sm:border-slate-200 flex flex-col h-full sm:h-auto sm:max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 sm:border-slate-100 bg-slate-900 sm:bg-slate-50 text-white sm:text-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 sm:bg-emerald-100 flex items-center justify-center text-emerald-400 sm:text-emerald-700">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Photograph Prescription</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 sm:text-slate-500">Hold steady in good light</p>
            </div>
          </div>
          <button
            id="close-camera-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white sm:hover:text-slate-700 hover:bg-slate-800 sm:hover:bg-slate-200 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder or Preview */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[300px]">
          {cameraError ? (
            <div className="text-center p-6 max-w-md text-white">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm font-medium mb-2">{cameraError}</p>
              <p className="text-xs text-slate-300 mb-4">
                You can still upload a photo directly or enter written prescription notes.
              </p>
              <button
                onClick={() => startCamera(facingMode)}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" /> Retry Camera
              </button>
            </div>
          ) : capturedPhoto ? (
            <div className="relative w-full h-full flex items-center justify-center p-2">
              <img
                src={capturedPhoto}
                alt="Captured prescription"
                className="max-h-[70vh] sm:max-h-[500px] w-auto object-contain rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Photo captured
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Document framing overlay guideline */}
              <div className="absolute inset-4 sm:inset-10 border-2 border-dashed border-white/70 rounded-2xl pointer-events-none flex flex-col justify-between p-3.5">
                <span className="text-[11px] font-medium bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md self-start">
                  Align prescription paper within frame
                </span>
                <span className="text-[11px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md self-end">
                  Ensure good lighting
                </span>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer Controls (Thumb-Optimized for Mobile) */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-800 sm:border-slate-100 bg-slate-950 sm:bg-white shrink-0">
          {!capturedPhoto ? (
            <div className="flex items-center justify-between gap-2 max-w-md mx-auto w-full">
              <button
                type="button"
                onClick={toggleFacingMode}
                className="text-xs text-slate-300 sm:text-slate-600 hover:text-white sm:hover:text-slate-900 px-3 py-2.5 rounded-xl border border-slate-700 sm:border-slate-200 hover:bg-slate-800 sm:hover:bg-slate-50 transition-colors flex items-center gap-1.5 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs">Flip</span>
              </button>

              {/* Large circular shutter button */}
              <button
                id="capture-photo-btn"
                type="button"
                onClick={takeSnapshot}
                disabled={Boolean(cameraError)}
                className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 text-white shadow-lg transition-all flex items-center justify-center ring-4 ring-emerald-400/30"
                aria-label="Capture photo"
              >
                <Camera className="w-7 h-7 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white sm:text-slate-500 sm:hover:text-slate-700 px-3 py-2.5 min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 max-w-md mx-auto w-full">
              <button
                id="retake-photo-btn"
                type="button"
                onClick={handleRetake}
                className="flex-1 py-3 px-4 border border-slate-700 sm:border-slate-200 text-slate-200 sm:text-slate-700 hover:bg-slate-800 sm:hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 min-h-[48px]"
              >
                <RefreshCw className="w-4 h-4" /> Retake
              </button>
              <button
                id="use-photo-btn"
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 min-h-[48px]"
              >
                <Check className="w-4 h-4" /> Use Photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
