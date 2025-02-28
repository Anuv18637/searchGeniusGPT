import { SupportedExportFormats } from '@/types/export';
import { PluginKey } from '@/types/plugin';
import { IconFileExport, IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Import } from '../Settings/Import';
import { Key } from '../Settings/Key';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import { useRouter } from 'next/router';

interface Props {
  lightMode: 'light' | 'dark';
  apiKey: string;
  pluginKeys: PluginKey[];
  conversationsCount: number;
  onToggleLightMode: (mode: 'light' | 'dark') => void;
  onApiKeyChange: (apiKey: string) => void;
  onClearConversations: () => void;
  onExportConversations: () => void;
  onImportConversations: (data: SupportedExportFormats) => void;
  onPluginKeyChange: (pluginKey: PluginKey) => void;
  onClearPluginKey: (pluginKey: PluginKey) => void;
}

export const ChatbarSettings: FC<Props> = ({
  lightMode,
  apiKey,
  pluginKeys,
  conversationsCount,
  onToggleLightMode,
  onApiKeyChange,
  onClearConversations,
  onExportConversations,
  onImportConversations,
  onPluginKeyChange,
  onClearPluginKey,
}) => {
  const { t } = useTranslation('sidebar');
  const router = useRouter()

  const logout = () => {
    localStorage.clear();
    router.push('/login')
  }
  // const handleChange = (event: any) => {
  //   onApiKeyChange(event.target.value)
  // }
  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversationsCount > 0 ? (
        <ClearConversations onClearConversations={onClearConversations} />
      ) : null}

      {/* <Import onImport={onImportConversations} /> */}

      {/* <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => onExportConversations()}
      /> */}
      {/* <input
        placeholder='Enter Openai Api Key'
        className="mt-1 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
        type="password"
        onChange={(event) => handleChange(event)} /> */}
      <Key apiKey={apiKey} onApiKeyChange={onApiKeyChange} />

      {/* <SidebarButton
        text={'LogOut'}
        icon={<IconFileExport size={18} />}
        onClick={() => logout()}
      /> */}

    </div>
  );
};
