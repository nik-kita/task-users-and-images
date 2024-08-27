export function genChunk(chunkSize: number, generator: () => Record<string, unknown>) {
  const chunk = []

  for (let i = 0; i < chunkSize; ++i) {
    chunk.push(generator())
  }

  return chunk
}
