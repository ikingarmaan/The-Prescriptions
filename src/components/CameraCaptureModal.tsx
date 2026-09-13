import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Camera,
  X,
  RefreshCw,
  Check,
  AlertCircle,
  Zap,
  ZapOff,
  Smartphone,
  Upload,
  Info,
} from 'lucide-react';

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
  const nativeFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isTorchOn, setIsTorchOn] = useState<boolean>(false);
  const [torchSupported, setTorchSupported] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsTorchOn(false);
    setTorchSupported(false);
  }, [stream]);

  const startCamera = useCallback(
    async (mode: 'environment' | 'user') => {
      stopCamera();
      setCameraError(null);
      setIsStarting(true);

      // Verify browser support for mediaDevices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(
          'Live camera stream is not supported in this browser. Please use your phone camera app or upload from gallery.'
        );
        setIsStarting(false);
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Detect torch support on the active video track
        const videoTrack = mediaStream.getVideoTracks()[0];
        if (videoTrack) {
          const caps = (videoTrack.getCapabilities ? videoTrack.getCapabilities() : {}) as any;
          if (caps && 'torch' in caps) {
            setTorchSupported(Boolean(caps.torch));
          } else {
            setTorchSupported(false);
          }
        }
      } catch (err: any) {
        console.error('Camera access error:', err);

        // Fallback: try default video constraint if environment facingMode fails
        if (mode === 'environment') {
          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
            setStream(fallbackStream);
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream;
            }
            setIsStarting(false);
            return;
          } catch (e: any) {
            setCameraError(
              e.name === 'NotAllowedError'
                ? 'Camera access was blocked by your browser. You can still use your phone camera app directly below or allow camera in browser settings.'
                : 'Unable to start camera stream. Please use your phone camera app below.'
            );
          }
        } else {
          setCameraError(
            err.name === 'NotAllowedError'
              ? 'Camera permission denied. Tap below to use your phone camera app instead.'
              : err.message || 'Camera not available on this device.'
          );
        }
      } finally {
        setIsStarting(false);
      }
    },
    [stopCamera]
  );

  useEffect(() => {
    if (isOpen && !capturedPhoto) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, capturedPhoto, startCamera, stopCamera]);

  // Torch / Flashlight toggle
  const toggleTorch = async () => {
    if (!stream || !torchSupported) return;
    const track = stream.getVideoTracks()[0];
    if (track) {
      try {
        const nextState = !isTorchOn;
        await (track as any).applyConstraints({
          advanced: [{ torch: nextState }],
        });
        setIsTorchOn(nextState);
      } catch (e) {
        console.warn('Torch constraint error:', e);
      }
    }
  };

  // Capture snapshot from video feed
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Trigger visual shutter flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 160);

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

  // Direct native mobile camera app fallback (<input capture="environment">)
  const handleNativeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedPhoto(event.target.result as string);
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
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
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none overscroll-none h-[100dvh] w-screen sm:items-center sm:justify-center sm:bg-slate-950/85 sm:backdrop-blur-md sm:p-4"
    >
      {/* Hidden native camera and gallery file inputs for instant fallback */}
      <input
        ref={nativeFileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeFileChange}
      />
      <input
        ref={galleryFileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleNativeFileChange}
      />

      <div
        id="camera-modal-container"
        className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-md sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-slate-950 relative"
      >
        {/* Top Header Bar with Safe-Area Inset */}
        <div className="flex items-center justify-between px-4 sm:px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-tight text-white">Prescription Scanner</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">
                {capturedPhoto ? 'Review photo clarity' : 'Medical document viewfinder'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Torch / Flashlight Toggle (Only in capture mode & if supported) */}
            {!capturedPhoto && torchSupported && (
              <button
                type="button"
                onClick={toggleTorch}
                className={`p-2.5 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isTorchOn
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/40'
                    : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                }`}
                title={isTorchOn ? 'Turn Flash Off' : 'Turn Flash On'}
                aria-label="Toggle flashlight"
              >
                {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
              </button>
            )}

            {/* Flip camera toggle (Front/Back) */}
            {!capturedPhoto && !cameraError && (
              <button
                type="button"
                onClick={toggleFacingMode}
                className="p-2.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Switch Camera"
                aria-label="Switch camera"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            {/* Close Button */}
            <button
              id="close-camera-btn"
              onClick={onClose}
              className="p-2.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ml-1"
              aria-label="Close camera"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewfinder / Review / Error Central Stage */}
        <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center bg-black overflow-hidden p-3 sm:p-5">
          {cameraError ? (
            /* Error / Permission Blocked Fallback Screen */
            <div className="w-full max-w-sm p-5 text-center bg-slate-900/90 rounded-2xl border border-slate-800 text-white space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">Camera Stream Unavailable</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{cameraError}</p>
              </div>

              {/* Action 1: Direct Native Phone Camera App */}
              <button
                type="button"
                onClick={() => nativeFileInputRef.current?.click()}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Smartphone className="w-4 h-4" />
                <span>Snap with Phone Camera App (High Res)</span>
              </button>

              {/* Action 2: Choose from Photos */}
              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Choose Photo from Gallery</span>
              </button>

              {/* Action 3: Retry in-app camera */}
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4 pt-1 inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Browser Camera Again</span>
              </button>
            </div>
          ) : capturedPhoto ? (
            /* Review Captured Photo Screen */
            <div className="relative w-full h-full flex flex-col items-center justify-center min-h-0">
              <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
                <img
                  src={capturedPhoto}
                  alt="Captured prescription"
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-emerald-500/30 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Photo Captured
                </div>
              </div>

              <div className="text-[11px] text-slate-400 mt-2 text-center flex items-center gap-1 justify-center shrink-0">
                <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Make sure doctor handwriting, medicine names, and dosages are readable.</span>
              </div>
            </div>
          ) : (
            /* Active Live Viewfinder with Document Scanner Reticles */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Document Scanner Frame (Standard 3:4 prescription proportions) */}
              <div className="relative aspect-[3/4] w-full max-w-sm max-h-[60vh] sm:max-h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/20">
                {/* Live video feed */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Shutter flash animation overlay */}
                {isFlashing && (
                  <div className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 opacity-90 z-30" />
                )}

                {/* Laser scan line animation */}
                <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_14px_#34d399] animate-scanner-laser pointer-events-none z-10" />

                {/* 4 Glowing Document Corner Reticles */}
                <div className="absolute top-2 left-2 w-7 h-7 border-t-3 border-l-3 border-emerald-400 rounded-tl-lg shadow-[0_0_8px_#10b981] pointer-events-none z-10" />
                <div className="absolute top-2 right-2 w-7 h-7 border-t-3 border-r-3 border-emerald-400 rounded-tr-lg shadow-[0_0_8px_#10b981] pointer-events-none z-10" />
                <div className="absolute bottom-2 left-2 w-7 h-7 border-b-3 border-l-3 border-emerald-400 rounded-bl-lg shadow-[0_0_8px_#10b981] pointer-events-none z-10" />
                <div className="absolute bottom-2 right-2 w-7 h-7 border-b-3 border-r-3 border-emerald-400 rounded-br-lg shadow-[0_0_8px_#10b981] pointer-events-none z-10" />

                {/* Bottom guidance pill inside viewfinder */}
                <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none z-10">
                  <span className="text-[11px] font-semibold text-white/95 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md inline-block">
                    Position prescription inside green corners • Hold steady
                  </span>
                </div>
              </div>

              {/* Loading spinner while video stream initializes */}
              {isStarting && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 z-20">
                  <div className="w-8 h-8 border-3 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                  <span className="text-xs text-emerald-300 font-medium">Opening camera...</span>
                </div>
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Bottom Control Bar with Safe-Area Inset for iOS Home Indicator & Android Navigation */}
        <div className="px-4 sm:px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md shrink-0 z-20">
          {!capturedPhoto ? (
            <div className="flex items-center justify-between gap-3 max-w-sm mx-auto w-full">
              {/* Native phone camera app direct trigger */}
              <button
                type="button"
                onClick={() => nativeFileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white p-2 rounded-xl hover:bg-slate-800/80 transition-colors min-h-[48px] min-w-[64px]"
                title="Use phone native camera app"
                aria-label="Use system camera"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>System Cam</span>
              </button>

              {/* High-contrast large circular tactile shutter button */}
              <button
                id="capture-photo-btn"
                type="button"
                onClick={takeSnapshot}
                disabled={Boolean(cameraError) || isStarting}
                className="w-18 h-18 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center ring-4 ring-emerald-400/30 ring-offset-4 ring-offset-slate-950 cursor-pointer"
                aria-label="Capture photo"
              >
                <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full border-2 border-slate-950/40 flex items-center justify-center">
                  <Camera className="w-7 h-7 sm:w-6 sm:h-6 text-slate-950" />
                </div>
              </button>

              {/* Gallery upload */}
              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white p-2 rounded-xl hover:bg-slate-800/80 transition-colors min-h-[48px] min-w-[64px]"
                title="Upload from gallery"
                aria-label="Choose photo"
              >
                <Upload className="w-5 h-5 text-slate-300" />
                <span>Gallery</span>
              </button>
            </div>
          ) : (
            /* Review Mode Bottom Buttons (Retake vs Use Photo) */
            <div className="flex items-center justify-between gap-3 max-w-sm mx-auto w-full">
              <button
                id="retake-photo-btn"
                type="button"
                onClick={handleRetake}
                className="flex-1 py-3.5 px-4 border border-slate-700 bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 active:bg-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake</span>
              </button>
              <button
                id="use-photo-btn"
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Use Photo</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
