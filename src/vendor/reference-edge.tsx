// Adapted from BeatAPI/BeatDesign d2ef270, Apache-2.0. Changed standalone edge type and light-theme stroke.
import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';

import type { Edge } from '@xyflow/react';
type BeatCanvasFlowEdge = Edge<Record<string, unknown>, 'beatdesign-reference'>;

export function BeatCanvasReferenceEdge(props: EdgeProps<BeatCanvasFlowEdge>) {
  const lineageRole = props.data?.beatdesignLineageRole;
  const isLineageEdge =
    lineageRole === 'upstream' || lineageRole === 'downstream';
  const [path] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    curvature: 0.34,
  });
  const stroke =
    props.selected || isLineageEdge
      ? 'var(--beat-graph)'
      : 'rgba(94, 92, 230, 0.38)';
  const opacity =
    lineageRole === 'dimmed'
      ? 0.22
      : props.selected || isLineageEdge
        ? 1
        : 0.82;

  return (
    <BaseEdge
      id={props.id}
      path={path}
      interactionWidth={18}
      style={{
        stroke,
        strokeWidth: props.selected || isLineageEdge ? 2.2 : 1.8,
        strokeLinecap: 'round',
        opacity,
        transition: 'stroke 160ms ease, opacity 160ms ease',
      }}
    />
  );
}
