import { useCallback, useEffect, useRef, useState } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasError) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, [hasError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      setPlaying(true);
      setShowOverlay(false);
    };
    const onPause = () => {
      setPlaying(false);
      if (video.currentTime > 0 && !video.ended) setShowOverlay(true);
    };
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => {
      setPlaying(false);
      setShowOverlay(true);
    };
    const onError = () => setHasError(true);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('error', onError);
    };
  }, [src]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'KeyF' && containerRef.current) {
        const el = containerRef.current;
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void el.requestFullscreen();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [togglePlay]);

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  };

  return (
    <div
      className="video-player"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={title ?? 'Project video'}
    >
      <div className="video-player__screen">
        <video
          ref={videoRef}
          className="video-player__video"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
        />
        {hasError && (
          <div className="video-player__error">
            <p>视频文件未找到或无法播放</p>
            <p className="muted">
              请将 MP4 放入 <code>public/assets/videos/</code> 并检查 site.json 路径
            </p>
          </div>
        )}
        {showOverlay && !hasError && (
          <button
            type="button"
            className="video-player__overlay-btn"
            onClick={togglePlay}
            aria-label="Play video"
          >
            <span className="video-player__play-icon" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="video-player__controls">
        <button
          type="button"
          className="video-player__btn"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          disabled={hasError}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <span className="video-player__time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <input
          type="range"
          className="video-player__seek"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          aria-label="Seek"
          disabled={hasError}
        />
        <button
          type="button"
          className="video-player__btn"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          disabled={hasError}
        >
          {muted || volume === 0 ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          className="video-player__volume"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(e) => handleVolume(Number(e.target.value))}
          aria-label="Volume"
          disabled={hasError}
        />
        <button
          type="button"
          className="video-player__btn"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
