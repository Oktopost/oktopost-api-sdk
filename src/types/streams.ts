export interface StreamTab {
  Id: string;
  Name: string;
  Status: string;
  Created: string;
}

export interface CreateStreamTabParams {
  name: string;
}

export interface UpdateStreamTabParams {
  name: string;
}

export interface Stream {
  Id: string;
  Created: string;
  Name: string;
  Network: string;
  Type: string;
  StreamTabId: string;
  CredentialId: string;
  Position: number;
}

export interface StreamListParams {
  position?: number;
}

export interface CreateStreamParams {
  streamTabId: string;
  network: string;
  credentialId: string;
  type: string;
  keyword?: string;
  position?: number;
}

export interface UpdateStreamPositionParams {
  position: number;
}
