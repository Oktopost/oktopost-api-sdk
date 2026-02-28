import { collectAll } from '../../../src/pagination/paginator.js';

describe('collectAll', () => {
  it('collects all items from async iterable', async () => {
    async function* generate() {
      yield 1;
      yield 2;
      yield 3;
    }

    const result = await collectAll(generate());
    expect(result).toEqual([1, 2, 3]);
  });

  it('returns empty array for empty iterable', async () => {
    async function* generate() {
      // yields nothing
    }

    const result = await collectAll(generate());
    expect(result).toEqual([]);
  });

  it('handles single item', async () => {
    async function* generate() {
      yield 'only';
    }

    const result = await collectAll(generate());
    expect(result).toEqual(['only']);
  });
});
