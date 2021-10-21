import camelcase from 'camelcase';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class CamelCaseStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public tableName(targetName: string): string {
    return `${camelcase(targetName)}s`;
  }
}
