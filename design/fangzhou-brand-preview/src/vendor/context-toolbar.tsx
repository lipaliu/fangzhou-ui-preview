// Adapted from BeatAPI/BeatDesign d2ef270, Apache-2.0. Replaced utility styling for Fangzhou VI; action contract retained.
const cn = (...values: unknown[]) => values.filter(Boolean).join(' ');
import { Download, DownloadIcon, Eye, Film, Sparkles } from 'lucide-react';

const beatcanvasPanelClassName = 'glass';

export function BeatCanvasContextToolbar({
  canDownload,
  canPreview,
  downloadLabel,
  isBatchDownload = false,
  previewLabel,
  onDownload,
  onPreview,
  addToTimelineLabel,
  canAddToTimeline = false,
  onAddToTimeline,
  continueVideoLabel,
  canContinueVideo = false,
  onContinueVideo,
}: {
  canDownload: boolean;
  canPreview: boolean;
  downloadLabel: string | null;
  isBatchDownload?: boolean;
  previewLabel: string | null;
  onDownload: () => void;
  onPreview: () => void;
  addToTimelineLabel?: string | null;
  canAddToTimeline?: boolean;
  onAddToTimeline?: () => void;
  continueVideoLabel?: string | null;
  canContinueVideo?: boolean;
  onContinueVideo?: () => void;
}) {
  const actionClassName =
    'context-action';

  return (
    <section
      className={cn(
        'context-toolbar',
        beatcanvasPanelClassName
      )}
    >
      {downloadLabel ? (
        <button
          type="button"
          className={cn(actionClassName, !canDownload && 'opacity-45')}
          onClick={onDownload}
          disabled={!canDownload}
        >
          {isBatchDownload ? (
            <DownloadIcon className="size-4" strokeWidth={2.1} />
          ) : (
            <Download className="size-4" strokeWidth={2.1} />
          )}
          <span>{downloadLabel}</span>
        </button>
      ) : null}
      {previewLabel ? (
        <button
          type="button"
          className={cn(actionClassName, !canPreview && 'opacity-45')}
          onClick={onPreview}
          disabled={!canPreview}
        >
          <Eye className="size-4" strokeWidth={2.1} />
          <span>{previewLabel}</span>
        </button>
      ) : null}
      {continueVideoLabel ? (
        <button
          type="button"
          className={cn(actionClassName, !canContinueVideo && 'opacity-45')}
          onClick={onContinueVideo}
          disabled={!canContinueVideo}
        >
          <Sparkles className="size-4" strokeWidth={2.1} />
          <span>{continueVideoLabel}</span>
        </button>
      ) : null}
      {addToTimelineLabel ? (
        <button
          type="button"
          className={cn(actionClassName, !canAddToTimeline && 'opacity-45')}
          onClick={onAddToTimeline}
          disabled={!canAddToTimeline}
        >
          <Film className="size-4" strokeWidth={2.1} />
          <span>{addToTimelineLabel}</span>
        </button>
      ) : null}
    </section>
  );
}
