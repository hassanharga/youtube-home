import { FC, useEffect, useRef, useState } from 'react';
import type { Video } from '../data/home';
import { formatDuration, formatTimeAgo } from '../utils/formatdDuration';

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
});

const VideoGridItem: FC<Video> = ({ channel, duration, id, postedAt, thumbnailUrl, title, videoUrl, views }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    return () => {};
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt="thumbnailUrl"
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? 'rounded-none' : 'rounded-xl'
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary text-sm px-0.5 rounded">{formatDuration(duration)}</div>
        <video
          className={`block object-cover h-full absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
        ></video>
      </a>
      <div className="flex gap-2">
        <a href={`/2${channel.id}`} className="flex-shrink-0">
          <img src={channel.profileUrl} alt="" className="w-12 h-12 rounded-full" />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/${channel.id}`} className="text-secondary-text text-sm">
            {title}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views . {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
