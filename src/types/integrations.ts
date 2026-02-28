export interface IntegrationListItem {
  Id: string;
  Created: string;
  Modified: string;
  Status: 'valid' | 'invalid';
  State: 'active' | 'disabled';
  AccountId: string;
  Type: string;
  Version: number;
  CnameId: string | null;
  SettingsData: Record<string, unknown>;
}

export interface IntegrationAssets {
  Credentials: {
    Id: string;
    Name: string;
    DisplayName: string;
    Status: string;
    Network: string;
  }[];
  Boards: unknown[];
}

export interface Integration extends IntegrationListItem {
  Assets?: IntegrationAssets;
}

export interface IntegrationListParams {
  type?: string;
  _page?: number;
  _count?: 25 | 50 | 100;
}

export interface IntegrationGetParams {
  withAssets?: 0 | 1;
}

export interface CreateIntegrationParams {
  type: string;
  cnameId: string;
}

export interface UpdateIntegrationParams {
  state?: 'active' | 'disabled';
  cnameId?: string;
}
