/* eslint-disable no-console */
import chalk from 'chalk';

export type Logger = {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  action(...args: any[]): void;
};

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'action';

export function createLogger(logLevel: LogLevel): Logger {
  return {
    debug(...args: any[]) {
      if (logLevel === 'debug') {
        console.log(chalk.blue('debug'), ...args);
      }
    },
    action(...args: any[]) {
      if (logLevel === 'debug' || logLevel === 'action') {
        console.log(chalk.cyan('action'), ...args);
      }
    },
    info(...args: any[]) {
      if (logLevel === 'debug' || logLevel === 'info' || logLevel === 'action') {
        console.log(chalk.green('info'), ...args);
      }
    },
    warn(...args: any[]) {
      if (logLevel === 'debug' || logLevel === 'info' || logLevel === 'warn') {
        console.log(chalk.yellow('warning'), ...args);
      }
    },
    error(...args: any[]) {
      console.log(`\n`);
      if (logLevel === 'debug') {
        throw new Error(...args);
      }
      console.log(chalk.red('error'), ...args);
    },
  };
}
