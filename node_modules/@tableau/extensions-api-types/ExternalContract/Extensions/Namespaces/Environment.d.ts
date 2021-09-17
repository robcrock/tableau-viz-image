import { ExtensionContext, ExtensionMode } from './Tableau';
/**
 * The environment namespace provides a way to programmatically gather
 * information about the environment in which the Extensions is running.
 */
export interface Environment {
    /**
     * @returns  The version of the API being used by the Extensions.
     */
    readonly apiVersion: string;
    /**
     * @returns  Current context in which the Extensions is running (i.e. Desktop or Server).
     */
    readonly context: ExtensionContext;
    /**
     * @returns  The language of the Tableau instance that is running the Extensions.
     */
    readonly language: string;
    /**
     * @returns  The OS locale of the environment in which the Extensions is running.
     */
    readonly locale: string;
    /**
     * @returns  Current mode of the Extensions (i.e. authoring or viewing).
     */
    readonly mode: ExtensionMode;
    /**
     * @returns  The OS in which the Extensions is running.
     */
    readonly operatingSystem: string;
    /**
     * @returns  The version of Tableau that is running the Extensions.
     */
    readonly tableauVersion: string;
}
