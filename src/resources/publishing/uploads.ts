import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Upload,
  UploadListParams,
  CreateUploadParams,
  VideoValidation,
} from '../../types/publishing.js';

export class UploadsResource extends BaseResource {
  async get(id: string): Promise<Upload> {
    const response = await this.httpClient.get<SingleApiResponse<'Upload', Upload>>(
      `/upload/${id}`,
    );
    return response.Upload;
  }

  async list(params?: UploadListParams): Promise<PaginatedApiResponse<Upload>> {
    return this.httpClient.get<PaginatedApiResponse<Upload>>(
      '/upload',
      params,
    );
  }

  async *listAll(
    params?: Omit<UploadListParams, '_page' | '_count'>,
  ): AsyncGenerator<Upload, void, undefined> {
    yield* this.autoPaginate<Upload>('/upload', params);
  }

  async create(params: CreateUploadParams): Promise<Upload> {
    const response = await this.httpClient.post<SingleApiResponse<'Upload', Upload>>(
      '/upload',
      params,
    );
    return response.Upload;
  }

  async validateVideo(
    mediaId: string,
  ): Promise<Record<string, VideoValidation>> {
    const response = await this.httpClient.get<
      BaseApiResponse & { Validations: Record<string, VideoValidation> }
    >(`/video-validate/${mediaId}`);
    return response.Validations ?? {};
  }
}
