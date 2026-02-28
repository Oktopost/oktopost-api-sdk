import { describe, it, expect } from 'vitest';
import { UploadsResource } from '../../../../src/resources/publishing/uploads.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('UploadsResource', () => {
  it('get calls GET /upload/{id}', async () => {
    const http = createMockHttpClient();
    const uploads = new UploadsResource(http);
    const mockUpload = { Id: 'up1', Status: 'complete', Name: 'video.mp4' };
    (http.get as any).mockResolvedValue({ Result: true, Upload: mockUpload });

    const result = await uploads.get('up1');

    expect(http.get).toHaveBeenCalledWith('/upload/up1');
    expect(result).toEqual(mockUpload);
  });

  it('list calls GET /upload with params', async () => {
    const http = createMockHttpClient();
    const uploads = new UploadsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'up1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await uploads.list({ status: 'complete' });

    expect(http.get).toHaveBeenCalledWith('/upload', { status: 'complete' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const uploads = new UploadsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = [];
    for await (const item of uploads.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it('create calls POST /upload', async () => {
    const http = createMockHttpClient();
    const uploads = new UploadsResource(http);
    const mockUpload = { Id: 'up2', Status: 'pending' };
    (http.post as any).mockResolvedValue({ Result: true, Upload: mockUpload });

    const result = await uploads.create({ source: 'https://example.com/video.mp4', name: 'video.mp4' });

    expect(http.post).toHaveBeenCalledWith('/upload', { source: 'https://example.com/video.mp4', name: 'video.mp4' });
    expect(result).toEqual(mockUpload);
  });

  it('validateVideo calls GET /video-validate/{mediaId}', async () => {
    const http = createMockHttpClient();
    const uploads = new UploadsResource(http);
    const mockValidations = {
      Facebook: { isValid: true, errors: [] },
      Twitter: { isValid: false, errors: ['Video too long'] },
    };
    (http.get as any).mockResolvedValue({ Result: true, Validations: mockValidations });

    const result = await uploads.validateVideo('med1');

    expect(http.get).toHaveBeenCalledWith('/video-validate/med1');
    expect(result).toEqual(mockValidations);
  });
});
