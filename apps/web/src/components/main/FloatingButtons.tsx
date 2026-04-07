import { useTranslation } from 'react-i18next';
import { FolderCode } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

interface FloatingButtonsProps {
  /** Workspace パス - ボタン表示はパスの有無で判定 */
  workspacePath?: string;
}

export function FloatingButtons({ workspacePath }: FloatingButtonsProps) {
  const { t } = useTranslation();
  const { databricksHost } = useUser();

  const handleOpenWorkspace = () => {
    if (!workspacePath || !databricksHost) return;
    const workspaceUrl = `https://${databricksHost}/#workspace${workspacePath}`;
    window.open(workspaceUrl, '_blank');
  };

  if (!workspacePath) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-[7.5rem] px-4 pointer-events-none z-10">
      <div className="w-full max-w-[735px] mx-auto flex justify-end items-center pointer-events-auto">
        <div className="flex items-center h-8 px-3 rounded-lg shadow-lg bg-background border">
          <button
            className="flex items-center gap-1 hover:opacity-70"
            onClick={handleOpenWorkspace}
          >
            <FolderCode className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium">{t('databricksApp.workspace')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
