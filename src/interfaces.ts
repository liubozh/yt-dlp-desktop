export interface RunCommandOptions {
  command: string;
  args: string[];
}

export interface IElectronAPI {
  runCommand(options: RunCommandOptions): Promise<void>;
  killCommand(): void;
  onCommandOutput(callback: (output: string) => void): void;
  onCommandStopped(
    callback: (data: { code: number; signal: string }) => void,
  ): void;
}
