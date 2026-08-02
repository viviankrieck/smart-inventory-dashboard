import { defineStore } from 'pinia';
import { LocalStorage, Dark } from 'quasar';

const SETTINGS_KEY = 'sid_settings';
const DEFAULT_LOW_STOCK_THRESHOLD = 15;

interface PersistedSettings {
  darkMode: boolean;
  lowStockThreshold: number;
}

type SettingsState = PersistedSettings;

const loadPersisted = (): PersistedSettings => {
  return (
    LocalStorage.getItem<PersistedSettings>(SETTINGS_KEY) ?? {
      darkMode: false,
      lowStockThreshold: DEFAULT_LOW_STOCK_THRESHOLD,
    }
  );
};

/**
 * Preferências do usuário que precisam sobreviver a um refresh da página:
 * tema (claro/escuro) e o limite considerado "estoque baixo" no sistema.
 */
export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => loadPersisted(),

  actions: {
    persist() {
      LocalStorage.set(SETTINGS_KEY, { darkMode: this.darkMode, lowStockThreshold: this.lowStockThreshold });
    },

    /** Aplica o tema salvo. Deve ser chamado uma vez, na inicialização do app. */
    applyDarkMode() {
      Dark.set(this.darkMode);
    },

    setDarkMode(value: boolean) {
      this.darkMode = value;
      Dark.set(value);
      this.persist();
    },

    toggleDarkMode() {
      this.setDarkMode(!this.darkMode);
    },

    setLowStockThreshold(value: number) {
      this.lowStockThreshold = Math.max(1, Math.round(value));
      this.persist();
    },

    resetLowStockThreshold() {
      this.setLowStockThreshold(DEFAULT_LOW_STOCK_THRESHOLD);
    },
  },
});
