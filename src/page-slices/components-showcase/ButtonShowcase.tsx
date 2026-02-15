'use client';

import {
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  GlassButton,
  OutlineButton,
  DestructiveButton,
  NeonButton,
} from '../../shared/ui/button';

export default function ButtonShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton tooltip="Primary action" onClick={() => alert('Primary clicked')}>primary</PrimaryButton>
          <SecondaryButton tooltip="Secondary action" onClick={() => alert('Secondary clicked')}>secondary</SecondaryButton>
          <GhostButton tooltip="Ghost action" onClick={() => alert('Ghost clicked')}>ghost</GhostButton>
          <GlassButton tooltip="Glass action" onClick={() => alert('Glass clicked')}>glass</GlassButton>
          <OutlineButton tooltip="Outline action" onClick={() => alert('Outline clicked')}>outline</OutlineButton>
          <DestructiveButton tooltip="Destructive action" onClick={() => alert('Destructive clicked')}>destructive</DestructiveButton>
          <NeonButton tooltip="Neon action" onClick={() => alert('Neon clicked')}>neon</NeonButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton size="sm" tooltip="Small button">Size sm</PrimaryButton>
          <PrimaryButton size="md" tooltip="Medium button">Size md</PrimaryButton>
          <PrimaryButton size="lg" tooltip="Large button">Size lg</PrimaryButton>
          <PrimaryButton size="icon" tooltip="Icon button">Q</PrimaryButton>
          <PrimaryButton disabled tooltip="This button is disabled">Disabled</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
